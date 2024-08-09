/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

module.exports = nextConfig;
