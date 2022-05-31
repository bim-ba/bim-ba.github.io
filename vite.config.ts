import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./node_modules", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./public", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/components/pages", import.meta.url)),
      "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
      "@style": fileURLToPath(new URL("./src/style", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types/types.d.ts", import.meta.url)),
      "@injection-keys": fileURLToPath(new URL("./src/common/injection-keys.ts", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
    },
  },
  build: {
    minify: true,
    outDir: "docs",
    target: "esnext",
  },
});
