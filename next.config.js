/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig