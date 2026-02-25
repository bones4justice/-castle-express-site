/** @type {import('next').NextConfig} */
const nextConfig = {
  // Clean trailing slashes to match WordPress URL structure for future migration
  trailingSlash: true,
};

module.exports = nextConfig;
