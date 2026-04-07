import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.2;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float t = uTime * 0.12;

    float swirl = fbm(uv * 2.4 + vec2(t * 0.8, -t));
    float bands = sin((uv.x * 3.8 + uv.y * 2.2) + t * 1.6) * 0.5 + 0.5;

    vec3 base = mix(vec3(0.05, 0.08, 0.18), vec3(0.02, 0.04, 0.1), uv.y * 0.5 + 0.5);
    vec3 cyan = vec3(0.35, 0.94, 1.0);
    vec3 amber = vec3(1.0, 0.52, 0.27);
    vec3 violet = vec3(0.62, 0.48, 0.98);

    vec3 blend = mix(cyan, amber, bands);
    blend = mix(blend, violet, swirl * 0.8);

    float vignette = smoothstep(1.2, 0.25, length(uv));
    vec3 color = mix(base, blend, 0.68) * vignette;

    gl_FragColor = vec4(color, 0.9);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function AuroraPlane() {
  const materialRef = useRef(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  return (
    <mesh scale={[12, 7, 1]} position={[0, 0, -2]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
      />
    </mesh>
  );
}

function GlowOrbs() {
  const colors = [new Color("#73f0ff"), new Color("#ff8f45"), new Color("#9c7cff")];
  const positions = [
    [-3, 1.2, -1.2],
    [2.4, -0.4, -0.8],
    [0.4, 1.6, -1.6],
  ];

  return positions.map((pos, index) => (
    <mesh key={pos.join(",")} position={pos}>
      <sphereGeometry args={[0.36, 32, 32]} />
      <meshStandardMaterial emissive={colors[index]} emissiveIntensity={3.6} color={colors[index]} />
    </mesh>
  ));
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#060810"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={16} color="#73f0ff" />
      <pointLight position={[-2, -1.5, 2]} intensity={12} color="#ff8f45" />
      <AuroraPlane />
      <GlowOrbs />
    </>
  );
}

export default function ProjectsAurora3D() {
  return (
    <div className="projects-scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  );
}
