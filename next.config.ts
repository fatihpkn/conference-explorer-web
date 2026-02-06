import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://static.photos/**"),
      new URL("https://images.unsplash.com/**"),
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
