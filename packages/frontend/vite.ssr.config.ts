// packages/frontend/vite.ssr.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/server-render.tsx"),
      formats: ["cjs"],
      fileName: () => "server-render.cjs",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/server"],
    },
    outDir: "dist/ssr",
  },
});
