import type { NextConfig } from "next";

const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_PLACEHOLDER_KEY_FOR_BUILD",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
