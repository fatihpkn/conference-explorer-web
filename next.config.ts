import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
