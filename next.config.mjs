/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
