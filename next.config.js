/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'a-us.storyblok.com',
      'tailwindui.com',
      'remodelmate-v2-local.s3.us-east-2.amazonaws.com',
      'remodelmate-contractor-app.s3.us-east-1.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
