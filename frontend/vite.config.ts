import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy:
        env.VITE_MODE === "DEV"
          ? {
              "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
              },
            }
          : undefined,
    },
  };
});
