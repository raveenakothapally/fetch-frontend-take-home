import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    imageSizes: [96, 128, 256, 384],
    remotePatterns: [
      {
        hostname: "frontend-take-home.fetch.com",
        pathname: "/dog-images/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
