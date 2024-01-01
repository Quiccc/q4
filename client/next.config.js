/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        console.log("Rewrites called");
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3030/api/:path*',
          },
        ]
      },
  };