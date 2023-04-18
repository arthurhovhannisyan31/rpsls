/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://host.docker.internal:3000/:path*" // Proxy to Backend
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/rooms",
        permanent: true,
      },
    ];
  },
  env: {
    API_URL: "graphql",
    FULL_API_URL: "http://host.docker.internal:3000"
  },
};

module.exports = nextConfig;
