/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['three', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
