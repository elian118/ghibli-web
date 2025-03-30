import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ghibli.jp',
        port: '',
        pathname: '/gallery/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ghibli.jp',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
