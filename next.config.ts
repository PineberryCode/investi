import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        browserslist: false,
        path: false,
        fs: false,
        module: false,
        os: false
      };
    }

    return config;
  },
};

export default nextConfig;
