/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hfx7w8onsf.ufs.sh',
        pathname: '/**', 
      },
    ],
  },
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output : "export",
};

export default nextConfig;
