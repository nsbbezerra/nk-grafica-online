/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1380, 1920, 2048, 3840],
    domains: [
      "image.freepik.com",
      "img.freepik.com",
      "i.pinimg.com",
      "localhost",
      "vps36066.publiccloud.com.br",
      "storage.googleapis.com",
      "media.graphassets.com",
      "sandbox.melhorenvio.com.br",
      "melhorenvio.com.br",
    ],
  },
};

module.exports = nextConfig;
