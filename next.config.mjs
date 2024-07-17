/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      // Add other paths here if needed
    }
  },
  basePath: isProd ? '/price-peekaboo-nextjs' : '',
  assetPrefix: isProd ? '/price-peekaboo-nextjs/' : '',
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  output: "export",  // <=== enables static exports
};

export default nextConfig;
