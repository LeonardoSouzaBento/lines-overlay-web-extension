import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 3007,
  },
  build: {
    rollupOptions: {
      input: {
        "content-script": path.resolve(__dirname, "./src/content-script.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "iife", // since it's a content script
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
