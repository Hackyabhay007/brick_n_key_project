import type { NextConfig } from "next";

interface RemotePattern {
  protocol: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname: string;
}

interface ImageConfig {
  remotePatterns: RemotePattern[];
}

interface CustomNextConfig extends NextConfig {
  webpackDevMiddleware: (config: any) => any;
  images: ImageConfig;
}

const nextConfig: CustomNextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.dev.overlay = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Strapi default port
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
        hostname: "your-production-strapi.com", // Change this for production
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
