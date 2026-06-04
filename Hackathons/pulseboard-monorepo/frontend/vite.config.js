import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // Add strictPort to ensure it doesn't jump to 5174 if 5173 is "busy"
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://backend:5000',
        ws: true, // This allows the upgrade from HTTP to WS
        changeOrigin: true, // Add this if not present
        rewrite: (path) => path, 
      },
    },
  },
});