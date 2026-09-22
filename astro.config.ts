import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // three.js / r3f are client-only; never bundle them on the server
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
});
