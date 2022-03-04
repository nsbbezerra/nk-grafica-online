/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1380, 1920, 2048, 3840],
    domains: [
      "image.freepik.com",
      "img.freepik.com",
      "i.pinimg.com",
      "localhost",
      "storage.googleapis.com",
    ],
  },
  trailingSlash: true,
  reactStrictMode: false,
};

module.exports = nextConfig;
