import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add empty turbopack config to acknowledge we're using Turbopack
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    // Externalize problematic packages on the server side
    if (isServer) {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
    }
    
    // Handle browser-specific modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
};

export default nextConfig;