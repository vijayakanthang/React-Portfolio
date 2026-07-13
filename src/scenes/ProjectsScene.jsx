import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../lib/store";
import { nearBand } from "../lib/sections";
import { PALETTE } from "../lib/palette";

/** A flickering emissive wall-screen for the control-room backdrop. */
function WallScreen({ position, size, seed }) {
  const mat = useRef();
  const meshRef = useRef();
  useFrame((state) => {
    const m = meshRef.current;
    if (!m || (m.parent && !m.parent.visible)) return; // skip when off-band
    if (mat.current) {
      mat.current.opacity =
        0.5 + Math.sin(state.clock.elapsedTime * (1 + seed) + seed * 5) * 0.12;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial ref={mat} color={PALETTE.green} transparent opacity={0.5} toneMapped={false} />
    </mesh>
  );
}

/** A slow-panning robotic arm silhouette, just for ambience. */
function RoboArm({ position, dir = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    const g = ref.current;
    if (!g || (g.parent && !g.parent.visible)) return; // skip when scene is off-band
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.25 * dir;
  });
  const dark = <meshStandardMaterial color="#06150c" roughness={0.7} metalness={0.4} />;
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, -1, 0]}><cylinderGeometry args={[0.18, 0.22, 2, 12]} />{dark}</mesh>
      <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, -0.7]}><boxGeometry args={[1.4, 0.16, 0.16]} />{dark}</mesh>
      <mesh position={[1.1, 0.5, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshBasicMaterial color={PALETTE.green} toneMapped={false} /></mesh>
    </group>
  );
}

export default function ProjectsScene() {
  const group = useRef();
  useFrame(() => {
    const p = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = nearBand("projects", p, 0.05);
  });

  const screens = useMemo(
    () => [
      { position: [-3.4, 1.6, -5], size: [1.8, 1.0], seed: 0.2 },
      { position: [3.4, 1.4, -5], size: [1.6, 0.9], seed: 0.7 },
      { position: [-1.2, 2.4, -5.4], size: [1.2, 0.7], seed: 1.3 },
      { position: [1.6, 2.6, -5.4], size: [1.0, 0.6], seed: 1.9 },
    ],
    []
  );

  return (
    <group ref={group} visible={false} position={[0, -0.4, 0]}>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 3, -2]} intensity={10} color={PALETTE.green} distance={20} />

      {/* back wall */}
      <mesh position={[0, 1.5, -5.6]}>
        <planeGeometry args={[18, 9]} />
        <meshStandardMaterial color="#020a05" roughness={1} />
      </mesh>
      {screens.map((s, i) => (
        <WallScreen key={i} {...s} />
      ))}

      <RoboArm position={[-5.5, 0.5, -2]} dir={1} />
      <RoboArm position={[5.5, 0.5, -2]} dir={-1} />

      {/* grid floor */}
      <gridHelper args={[40, 40, PALETTE.greenDim, "#031a0d"]} position={[0, -1.6, 0]} />
    </group>
  );
}
