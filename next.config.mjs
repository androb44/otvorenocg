/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statički export: cijeli sajt se builda u /out i može se hostovati bilo gdje
  // (Cloudflare Pages, Netlify, GitHub Pages…). Kad dođe pravi backend/SSR,
  // ukloniti "output" liniju i vratiti server rendering.
  output: "export"
};
export default nextConfig;
