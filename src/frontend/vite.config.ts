import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { sitemapGenerator } from "./src/plugins/sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    sitemapGenerator({
      hostname: 'https://inkom.ai',
      routes: [
        { path: '/', changefreq: 'weekly', priority: 1.0 },
        { path: '/privacy', changefreq: 'monthly', priority: 0.5 },
        { path: '/terms', changefreq: 'monthly', priority: 0.5 },
        { path: '/legal', changefreq: 'monthly', priority: 0.4 },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
    // Enable minification
    minify: 'terser',
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Enable compression in dev mode
    middlewareMode: false,
  },
});
