import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      // three.js / r3f are client-only; never bundle them on the server
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
});
