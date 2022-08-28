/** @type {import('next').NextConfig} */
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${process.env.PWD
    }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', "via.placeholder.com", "seed-mix-image.spotifycdn.com", 'dailymix-images.scdn.co', 'storage.googleapis.com', "firebasestorage.googleapis.com"],
    formats: ['image/avif', 'image/webp'],
  },
  // swcMinify: true,
}

module.exports = nextConfig
