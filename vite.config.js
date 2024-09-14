import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd());

  // const API_URL = `${env.VITE_API_URL ?? "http://localhost:8080"}`;

  return {
    // server: {
    //   proxy: {
    //     "/api/v1": API_URL,
    //   },
    // },
    plugins: [react()],
  };
});
