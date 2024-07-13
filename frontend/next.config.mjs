/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['iso-server-production.up.railway.app'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'https://iso-server-production.up.railway.app',
  },
};

export default nextConfig;
