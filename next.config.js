/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config, { isServer }) => {
    // Your existing alias logic here
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add your existing alias mappings here
    };
    return config;
  },
  // ADD THIS LINE TO DISABLE TURBOPACK
  experimental: {
    // This tells Next.js to not try to use Turbopack for this project
    turbopack: false,
  },
};

module.exports = nextConfig;