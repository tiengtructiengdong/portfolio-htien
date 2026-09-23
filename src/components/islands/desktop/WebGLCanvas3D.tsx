/**
 * WebGLCanvas3D.tsx
 * R3F WebGL canvas with mouse raycasting for the desktop scene.
 *
 * Hydrated client-side only (client:only="react").
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { MathUtils, Vector2 } from "three";
import type { ShaderMaterial } from "three";
import raymarchFrag from "@shaders/desktop/raymarch.frag?raw";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

interface SceneProps {
  pointer: { x: number; y: number };
  scroll: number;
}

function RaymarchScene({ pointer, scroll }: SceneProps): React.ReactElement {
  const matRef = useRef<ShaderMaterial>(null);
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) },
      uMouse: { value: new Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    if (!matRef.current) {
      return;
    }
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(new Vector2(pointer.x, pointer.y), 0.08);
    uniforms.uScroll.value = MathUtils.lerp(
      uniforms.uScroll.value,
      scroll,
      0.1,
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={raymarchFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export interface WebGLCanvas3DProps {
  className?: string;
  /** Live pointer state in NDC. */
  pointer?: { x: number; y: number };
  /** Page scroll progress [0,1]. */
  scroll?: number;
}

export default function WebGLCanvas3D({
  className,
  pointer = { x: 0, y: 0 },
  scroll = 0,
}: WebGLCanvas3DProps): React.ReactElement {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <RaymarchScene pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
