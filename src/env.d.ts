/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Vite's built-in `?raw` query imports the file contents as a string.
// Import shaders like:  import frag from "./shader.frag?raw";
declare module "*.frag?raw" {
  const shader: string;
  export default shader;
}

declare module "*.vert?raw" {
  const shader: string;
  export default shader;
}

declare module "*.glsl?raw" {
  const shader: string;
  export default shader;
}

declare module "*.glb" {
  const url: string;
  export default url;
}
