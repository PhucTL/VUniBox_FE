import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    base: env.VITE_BASE_PATH || "/",
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BE_API_URL || "https://localhost:7024/api",
          changeOrigin: true,
          secure: false, // Allow self-signed certificates
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
