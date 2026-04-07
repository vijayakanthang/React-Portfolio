import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ball({ progress }) {
  const ballRef = useRef(null);
  const trailRef = useRef([]);
  const pointsRef = useRef(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(30 * 3), 3));
    return g;
  }, []);

  useFrame(() => {
    if (!ballRef.current || !pointsRef.current) return;
    const y = THREE.MathUtils.lerp(2.5, -2.5, progress);
    const x = Math.sin(progress * Math.PI * 3) * 0.3;
    ballRef.current.position.set(x, y, 0);

    trailRef.current.unshift(new THREE.Vector3(x, y, 0));
    trailRef.current = trailRef.current.slice(0, 30);

    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < 30; i += 1) {
      const p = trailRef.current[i] || new THREE.Vector3(x, y, 0);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#aaff00" emissive="#aaff00" emissiveIntensity={3} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial color="#aaff00" size={0.05} transparent opacity={0.55} />
      </points>
    </>
  );
}

export default function PinballTracer({ progress = 0 }) {
  return (
    <div className="pinball-tracer">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <pointLight position={[1.8, 2, 2]} color="#aaff00" intensity={4} />
        <Ball progress={progress} />
      </Canvas>
    </div>
  );
}