/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'a-us.storyblok.com',
      'tailwindui.com',
      'remodelmate-contractor-app.s3.us-east-1.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
