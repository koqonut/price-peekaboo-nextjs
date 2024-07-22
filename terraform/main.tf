provider "aws" {
  region  = "us-east-1"
  profile = var.aws_profile
}

###################################
# Create Route53 hosted zone for  
# example.com (apex domain) 
###################################

resource "aws_route53_zone" "main" {
  name = var.apex_domain
}

###################################
# Create ACM certificate for 
# example.com (apex_domain) 
# and www.example.com (sub_domain)
###################################

resource "aws_acm_certificate" "domain_cert" {
  domain_name       = var.apex_domain
  validation_method = "DNS"
  subject_alternative_names = [var.sub_domain]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "Domain SSL Certificate"
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.domain_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = aws_route53_zone.main.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

###################################
# S3 bucket to host the website
###################################

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.s3_bucket_name
  acl    = "private"
  tags = {
    Name = "ppk Website Bucket"
  }
}

###################################
# S3 bucket for all the logs related to the website
###################################

resource "aws_s3_bucket" "log_bucket" {
  bucket = var.log_bucket_name
  acl    = "log-delivery-write"  # This line enables ACL access for the log bucket

  lifecycle_rule {
    enabled = true
    prefix  = "cloudfront-logs/"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    expiration {
      days = 365
    }
  }
  
  tags = {
    Name = "ppk Log Bucket"
  }

}


resource "aws_s3_bucket_ownership_controls" "website_bucket_ownership" {
  bucket = aws_s3_bucket.website_bucket.bucket

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}


###################################
# Create cloudfront resource 
# (make sure ACM certificates are issued)
###################################

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for S3 static site"
}


resource "aws_cloudfront_distribution" "static_site_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = "s3-website-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Static website distribution"
  default_root_object = "index.html"

  aliases = [var.apex_domain, var.sub_domain]


  default_cache_behavior {
    target_origin_id       = "s3-website-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.log_bucket.bucket_domain_name
    prefix          = "cloudfront-logs/"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.domain_cert.arn
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "CloudFront Distribution"
  }
  
}

###################################
# Add A record in Route 53 hosted zone
# for apex  (www.example.com)
###################################

resource "aws_route53_record" "apex" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.apex_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.static_site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.static_site_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

###################################
# Add  A record in Route 53 hosted zone
# for sub_domain  (www.example.com)
###################################

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.sub_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.static_site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.static_site_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}


###################################
# Add  cloudfront access to the 
# website bucket policy
###################################

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = var.s3_bucket_name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "s3:GetObject"
        Effect    = "Allow"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
        Principal = {
            Service = "cloudfront.amazonaws.com"
        },
        Condition = {
          "StringEquals" = {
            "AWS:SourceArn" = aws_cloudfront_distribution.static_site_distribution.arn
          }
        }
      },
    ]
  })

  depends_on = [aws_cloudfront_distribution.static_site_distribution]
}

resource "aws_s3_bucket_policy" "log_bucket_policy" {
  bucket = aws_s3_bucket.log_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
 {
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action = "s3:PutObject",
        Resource = "${aws_s3_bucket.log_bucket.arn}/cloudfront-logs/*",
        Condition = {
          StringEquals = {
            "aws:SourceArn": "${aws_cloudfront_distribution.static_site_distribution.arn}"
          }
        }
      },
      {
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action = "s3:GetBucketAcl",
        Resource = "${aws_s3_bucket.log_bucket.arn}"
      }
    ]
  })
}