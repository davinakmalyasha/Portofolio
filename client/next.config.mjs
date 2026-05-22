/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['three', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
