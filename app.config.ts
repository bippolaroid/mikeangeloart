import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [".ts.net"],
    },
  },

  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2025-10-22",
  },
});
