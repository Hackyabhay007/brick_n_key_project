import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Strapi default port
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-production-strapi.com", // Change this for production
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
