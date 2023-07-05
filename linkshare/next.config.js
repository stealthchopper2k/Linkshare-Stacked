/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.w3.org"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.w3.org",
        port: "",
        pathname: "/2000/svg",
      },
    ],
  },
};
module.exports = nextConfig;
