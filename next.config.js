/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://kidszone-ho5b.onrender.com/api/:path*'
      }
    ]
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig