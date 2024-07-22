#####

# aws_profile = "default" 
# dynamodb_table_name = "products_db"
# dynamodb_rcu = 15
# dynamodb_wcu = 15
# s3_bucket_name = "example-website-bucket"
# log_bucket_name = "example-website-log"
# apex_domain = "example.com"
# sub_domain = "www.example.com"

####

variable "s3_bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "log_bucket_name" {
  description = "Name of the S3 bucket to store logs"
  type        = string
}

variable "dynamodb_table_name" {
  description = "The name of the dynamoDb table"
  type        = string
}

variable "dynamodb_rcu" {
  description = "The read capacity units for the DynamoDB table"
  type        = number
  default     = 10  // You can set a default value or leave it without a default
}

variable "dynamodb_wcu" {
  description = "The wcu capacity units for the DynamoDB table"
  type        = number
  default     = 10  // You can set a default value or leave it without a default
}

variable "aws_profile" {
  description = "AWS CLI profile to use"
  type        = string
}

variable "apex_domain" {
  description = "domain to register"
  type        = string
}

variable "sub_domain" {
  description = "sub domain to register"
  type        = string
}

