/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  env: {
    SOCKET_URL: "http://localhost:9000/",
    SERVER_URL: "http://localhost:9000/",
    REDIS_URL: "redis://172.17.0.2:12000",
  },
};
