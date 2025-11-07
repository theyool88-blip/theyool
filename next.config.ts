import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for lightweight Docker/runtime deployments
  output: 'standalone',
};

export default nextConfig;
