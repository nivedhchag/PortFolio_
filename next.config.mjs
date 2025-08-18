/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // ✅ Required for GitHub Pages / Netlify static hosting
  output: 'export',
  basePath: '/apple-portfolio',   // your repo name
  assetPrefix: '/apple-portfolio/',
}

export default nextConfig
