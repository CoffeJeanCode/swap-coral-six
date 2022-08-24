/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', "via.placeholder.com", "seed-mix-image.spotifycdn.com", 'dailymix-images.scdn.co', 'storage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // swcMinify: true,
}

module.exports = nextConfig
