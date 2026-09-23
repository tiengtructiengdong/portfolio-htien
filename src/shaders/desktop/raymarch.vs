// raymarch.vs
// Fullscreen-quad vertex shader for the desktop raymarcher.
// Passes through UVs for the fragment stage.

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
