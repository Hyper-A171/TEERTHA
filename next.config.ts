import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Suppress typescript checks during build if there are minor type errors, but we will make it strict.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
