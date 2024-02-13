import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "./src/pages/"),
      components: path.resolve(__dirname, "./src/components/"),
      services: path.resolve(__dirname, "./src/services/"),
      utils: path.resolve(__dirname, "./src/utils"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      configs: path.resolve(__dirname, "./src/configs"),
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
});
