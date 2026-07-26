/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Speed up dev builds
  swcMinify: true,
  reactStrictMode: false,
}

module.exports = nextConfig