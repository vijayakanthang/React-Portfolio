import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Stars() {
  const ref = useRef(null);
  const points = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 900;
    const count = isMobile ? 150 : 400; // Drastically reduce on mobile
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.2) * 1.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.8} />
    </points>
  );
}

export default function SpaceField() {
  return (
    <div className="space-field">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <Stars />
      </Canvas>
    </div>
  );
}