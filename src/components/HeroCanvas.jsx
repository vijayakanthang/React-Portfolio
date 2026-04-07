import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function ParticleField({ count = 200, scrollProgress = 0 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 20;
      data[i * 3 + 1] = (Math.random() - 0.5) * 14;
      data[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    return data;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.04 + scrollProgress * 0.5;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#f0f4ff" transparent opacity={0.42} />
    </points>
  );
}

function CoreOrb({ scrollProgress = 0 }) {
  const orbRef = useRef(null);
  const materialRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      vec3 displaced = position + normal * (sin(position.y * 8.0 + uTime * 2.0) * 0.045);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;

    void main() {
      float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
      vec3 base = vec3(0.47, 0.9, 1.0);
      vec3 glow = vec3(0.0, 0.83, 1.0);
      vec3 color = mix(base, glow, fresnel);
      gl_FragColor = vec4(color, 0.95);
    }
  `;

  useFrame(({ clock }) => {
    if (!orbRef.current) return;
    const elapsed = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
    }
    orbRef.current.position.y = Math.sin(elapsed * 0.9) * 0.15;
    orbRef.current.rotation.y = elapsed * 0.2;
    const pulse = 0.9 + Math.sin(elapsed * 1.5) * 0.1 + scrollProgress * 0.2;
    orbRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent />
    </mesh>
  );
}

export default function HeroCanvas({ scrollProgress = 0 }) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas gl={{ powerPreference: "high-performance", antialias: false }} dpr={[1, 1.5]}>
        <OrthographicCamera makeDefault position={[0, 0, 8]} zoom={80} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 4]} color="#00d4ff" intensity={10} />
        <pointLight position={[-2, 2, 3]} color="#7c3aed" intensity={6} />
        <ParticleField scrollProgress={scrollProgress} />
        <CoreOrb scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
