import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    ssr: `./api/index.ts`,
    outDir: `dist`,
  },
  server: {
    port: 3100,
    proxy: {
      "/api": {
        target: `http://localhost:3100`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
