import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",        // static export
  images: {
    unoptimized: true,     // disable optimization so <Image> works in export mode
  },
};

export default nextConfig;
