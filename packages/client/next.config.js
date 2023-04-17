/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:3000/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
