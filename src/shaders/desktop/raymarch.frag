// raymarch.frag
// Full-precision desktop raymarcher. Uniforms provided by WebGLCanvas3D.
// License: MIT. Replace with production shader as needed.

precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;   // normalized [-1, 1]
uniform float uScroll;

// Distance to a repeating sphere field.
float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float map(vec3 p) {
  vec3 q = p;
  // gentle mouse-driven parallax
  q.xz -= uMouse * 0.5;
  // scroll drift
  q.y += uScroll * 2.0;
  // instance grid
  q.xz = mod(q.xz + 4.0, 8.0) - 4.0;
  return sdSphere(q, 1.2);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (vUv - 0.5) * 2.0;
  uv.x *= uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 0.0, -6.0);
  vec3 rd = normalize(vec3(uv, 1.5));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 96; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.001) { hit = 1.0; break; }
    if (t > 60.0) break;
    t += d;
  }

  vec3 col = vec3(0.04, 0.04, 0.07);
  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 lightDir = normalize(vec3(0.4, 0.8, -0.6));
    float diff = max(dot(n, lightDir), 0.0);
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col = vec3(0.1, 0.3, 0.9) * diff + vec3(0.5, 0.7, 1.0) * rim * 0.4;
    col += 0.02 * sin(uTime + p.yzx * 4.0);
  }

  // vignette
  col *= 1.0 - 0.4 * dot(uv, uv);

  gl_FragColor = vec4(col, 1.0);
}
