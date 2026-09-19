// wave2d.frag
// Low-precision 2D wave shader for mobile canvas.
// Designed for mediump to keep fill-rate low.

precision mediump float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uTouch;     // last touch in pixels
uniform float uTilt;      // device beta / gamma combined

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

  float t = uTime * 0.6;
  float w = sin(p.x * 6.0 + t) * 0.5 + sin(p.y * 8.0 - t * 1.3) * 0.5;

  // touch ripple
  vec2 tp = (uTouch / uResolution) - 0.5;
  tp.x *= uResolution.x / uResolution.y;
  float ripple = sin(length(p - tp) * 20.0 - t * 4.0) * 0.15;
  w += ripple;

  // tilt influence
  w += uTilt * 0.1;

  vec3 base = mix(vec3(0.05, 0.07, 0.14), vec3(0.12, 0.25, 0.6), w * 0.5 + 0.5);
  gl_FragColor = vec4(base, 1.0);
}
