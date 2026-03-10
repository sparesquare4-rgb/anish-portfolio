/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  experimental: {
    // needed for three/webgpu imports
  },
  webpack(config) {
    // Allow three/webgpu and three/tsl bare imports
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
