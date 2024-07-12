/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'loremflickr.com'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8080',
  },
};

export default nextConfig;
