/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_BASE_URL ?? "http://localhost:8080"}`;

  return {
    base: "/",
    port: 80,
    server: {
      proxy: {
        "/api/v1": API_URL,
      },
    },
    plugins: [react()],
  };
});
