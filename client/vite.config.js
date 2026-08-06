import path from "path"; // 1. Add this import at the very top
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: true,
  // },
  // 2. Add this resolve block to fix the "@/" shortcuts
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
