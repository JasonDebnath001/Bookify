import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["covers.openlibrary.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
    ],
  },
};

export default nextConfig;
