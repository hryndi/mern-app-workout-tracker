import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://workout-tracker-app-backend.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
