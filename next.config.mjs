/** @type {import('next').NextConfig} */
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
  basePath: "/price-peekaboo-nextjs",
  reactStrictMode: true,
  output: "export",  // <=== enables static exports
};

export default nextConfig;
