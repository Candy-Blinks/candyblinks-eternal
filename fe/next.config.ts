import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devnet.irys.xyz",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "gateway.pinit.io",
      },
      {
        protocol: "https",
        hostname: "crimson-quickest-ermine-498.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
