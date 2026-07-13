import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import InfinityLoop from "../three/InfinityLoop";
import Avatar from "../three/Avatar";
import { useStore } from "../lib/store";
import { PALETTE } from "../lib/palette";

/**
 * Landing scene group — lives inside the single persistent <Canvas>.
 * Deliberately minimal: the infinity loop and the lone figure (the same
 * cartoon-boy model, rendered as a dark silhouette). As you scroll into
 * About the figure turns to face you and fades — handing off to the About
 * avatar.
 */
export default function LandingScene() {
  const group = useRef();

  useFrame(() => {
    const progress = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = progress < 0.16;
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
        visWindow={[0, 0.1]}
        fade={0.03}
        baseRotationY={0}
        poses={["TPose", "Pose 29", "Pose 7"]}
        position={[0, -1.0, 0.2]}
        scale={0.95}
      />
    </group>
  );
}
