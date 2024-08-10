/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.freecodecamp.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
