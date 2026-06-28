import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import InfinityLoop from "../three/InfinityLoop";
import Avatar from "../three/Avatar";
import ParticleField from "../three/ParticleField";
import { useStore } from "../lib/store";
import { PALETTE } from "../lib/palette";

/**
 * Landing scene group — lives inside the single persistent <Canvas>.
 * The matrix void + infinity loop + the lone figure (the same cartoon-boy
 * model, rendered as a dark silhouette). As you scroll into About the
 * figure turns to face you and fades — handing off to the About avatar.
 */
export default function LandingScene() {
  const group = useRef();

  useFrame(() => {
    const progress = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = progress < 0.24;
  });

  return (
    <group ref={group}>
      <pointLight position={[0, 0.4, -1.4]} intensity={18} color={PALETTE.green} distance={8} />
      <pointLight position={[2.5, 1.5, 2]} intensity={6} color={PALETTE.greenSoft} distance={12} />
      {/* rim light from behind so the silhouette reads as an edge-lit figure */}
      <pointLight position={[0, 1, -2]} intensity={10} color={PALETTE.green} distance={9} />

      <InfinityLoop a={1.7} />

      {/* the lone figure — silhouette, faces away, then rotates + fades */}
      <Avatar
        silhouette
        faceReveal
        track={false}
        visWindow={[0, 0.15]}
        fade={0.04}
        baseRotationY={0}
        poses={["TPose", "Pose 29", "Pose 7"]}
        position={[0, -1.0, 0.2]}
        scale={0.95}
      />

      {/* ground glow under the figure */}
      <mesh position={[0, -1.0, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.95, 48]} />
        <meshBasicMaterial color={PALETTE.green} transparent opacity={0.22} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <ParticleField count={260} spread={18} size={0.05} colorA={PALETTE.green} colorB={PALETTE.greenDim} speed={0.02} />
    </group>
  );
}
