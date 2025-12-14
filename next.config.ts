import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
