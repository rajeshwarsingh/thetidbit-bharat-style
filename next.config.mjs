/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We render Cloudinary images with plain <img> + custom transforms, so the
  // built-in Image Optimizer is not used. Allow remote hosts anyway for safety.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  eslint: {
    // Migration: don't block production builds on lint.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // server/ helpers import modules with explicit `.js` extensions that
    // resolve to `.ts` files (legacy Vite resolution). Teach webpack the same.
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return config;
  },
};

export default nextConfig;
