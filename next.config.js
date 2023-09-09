/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_SIMDA: process.env.API_SIMDA,
  },
};

module.exports = nextConfig;
