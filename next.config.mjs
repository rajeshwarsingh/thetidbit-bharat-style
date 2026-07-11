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
    // The api/ handlers import sibling modules with explicit `.js` extensions
    // that actually resolve to `.ts` files (Vite bundler resolution). Teach
    // webpack the same mapping.
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return config;
  },
};

export default nextConfig;
