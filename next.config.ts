// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  
  output: 'export',

  

  images: {
    unoptimized: true, // ← remove when deploying to Vercel
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  
  compress:        true,
  reactStrictMode: true,
  poweredByHeader: false,

  
  reactCompiler: true,

};

export default nextConfig;