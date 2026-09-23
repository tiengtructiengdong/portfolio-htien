// wave2d.vs
// Fullscreen-quad vertex shader for the mobile 2D wave canvas.
// Maps clip-space position to UV in [0, 1].

attribute vec2 aPos;
varying vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
