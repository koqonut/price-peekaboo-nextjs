/** @type {import('next').NextConfig} */

//const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {

  //basePath: isProd ? '/price-peekaboo-nextjs' : '',
  //assetPrefix: isProd ? '/price-peekaboo-nextjs/' : '',
  //images: {
  //unoptimized: true
  //},
  reactStrictMode: true,
  //output: "export",  // <=== enables static exports
};

export default nextConfig;
