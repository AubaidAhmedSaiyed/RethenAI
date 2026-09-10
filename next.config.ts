import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Generates a pure static "out/" folder
  trailingSlash: true,   // Cloudflare Pages handles paths better with trailing slashes
  images: {
    unoptimized: true,   // Required for static export (no Next.js image server)
  },
};

export default nextConfig;
