import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
export default defineConfig({
  plugins: [vue(), cesium()],
  server: {
    host: "0.0.0.0",
    port: 5744
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
