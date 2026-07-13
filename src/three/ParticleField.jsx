import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Drifting cloud of additive, two-tone particles for ambient depth. */
export default function ParticleField({
  count = 600,
  spread = 24,
  size = 0.08,
  colorA = "#22d3ee",
  colorB = "#a855f7",
  speed = 0.04,
}) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color(colorA);
    const c2 = new THREE.Color(colorB);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      tmp.copy(c1).lerp(c2, Math.random());
      col[i * 3] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
    }
    return { positions: pos, colors: col };
  }, [count, spread, colorA, colorB]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || (g.parent && !g.parent.visible)) return; // skip when scene is off-band
    g.rotation.y += delta * speed;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
