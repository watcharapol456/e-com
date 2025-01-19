/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hfx7w8onsf.ufs.sh',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', 
        port: '', 
        pathname: '/f/**', // 
      },
    ],
  },
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output : "export",
};

export default nextConfig;
