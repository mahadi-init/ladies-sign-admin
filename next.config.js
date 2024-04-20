/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ibb.co",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "scontent.fdac24-2.fna.fbcdn.net",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // experimental: {
  //   typedRoutes: true,
  // },
};

module.exports = nextConfig;
