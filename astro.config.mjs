import { defineConfig, svgoOptimizer } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import rehypeCloudinaryPicture from "./src/plugins/rehype-cloudinary-picture.mjs";
export default defineConfig({
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [[rehypeCloudinaryPicture, { cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME }]],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  site: "https://phanatik.paulapplegate.com",
  integrations: [sitemap()],
});
