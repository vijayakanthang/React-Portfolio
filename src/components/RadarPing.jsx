import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Rings({ pulseBoost = 1 }) {
  const ringRefs = useRef([]);
  const delays = [0, 0.66, 1.33];
  const starPositions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = -2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    ringRefs.current.forEach((ring, idx) => {
      if (!ring) return;
      const t = (state.clock.elapsedTime * pulseBoost + delays[idx]) % 2;
      const scale = 0.2 + t * 3.5;
      ring.scale.setScalar(scale);
      ring.material.opacity = 0.8 - t * 0.4;
      if (ring.material.opacity < 0) ring.material.opacity = 0.8;
    });
  });

  return (
    <>
      {delays.map((delay, idx) => (
        <mesh key={delay} ref={(node) => (ringRefs.current[idx] = node)}>
          <ringGeometry args={[1, 1.02, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} side={2} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starPositions.length / 3} array={starPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" transparent opacity={0.3} size={0.03} />
      </points>
    </>
  );
}

export default function RadarPing({ pulseBoost = 1 }) {
  return (
    <div className="radar-ping-canvas">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Rings pulseBoost={pulseBoost} />
      </Canvas>
    </div>
  );
}