import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compilerOptions: {
    ignoreErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "147.93.106.161",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-production-strapi.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi.bricknkey.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
