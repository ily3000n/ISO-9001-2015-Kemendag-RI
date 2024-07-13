/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'https://iso-server-production.up.railway.app',
  },
};

export default nextConfig;
