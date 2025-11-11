import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for lightweight Docker/runtime deployments
  output: 'standalone',

  // Notion 이미지 허용
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
