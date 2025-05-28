/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'groomingmfb.com',
      },
      {
        protocol: 'https',
        hostname: 'gmfb.s3.amazonaws.com',
      },
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
