/** @type {import('next').NextConfig} */
// Prefer NEXT_PUBLIC_BASE_PATH so client asset URLs stay in sync with basePath.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
