/** @type {import('next').NextConfig} */
// Statischer Export fuer GitHub Pages: STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/flutlicht27-site pnpm build
// Private Vorschau als Artifact (relative Pfade): ARTIFACT=1 NEXT_PUBLIC_BASE_PATH=. NEXT_PUBLIC_BLOB_VIDEO=1 pnpm build
const staticExport = process.env.STATIC_EXPORT === "1";
const artifact = process.env.ARTIFACT === "1";
const nextConfig = {
  reactStrictMode: false,
  ...(staticExport ? { output: "export", basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "", images: { unoptimized: true }, trailingSlash: true } : {}),
  ...(artifact ? { output: "export", assetPrefix: "./", images: { unoptimized: true } } : {}),
};
export default nextConfig;
