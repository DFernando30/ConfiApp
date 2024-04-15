import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    server: {
      host: true,
      strictPort: true,
      port: 8000,
      },
    alias: [{ find: "@", replacement: "/src" }],
  },
});
