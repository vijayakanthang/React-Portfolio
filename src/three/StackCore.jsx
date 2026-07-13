import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../lib/store";
import { PALETTE } from "../lib/palette";

/**
 * "THE STACK CORE" — reduced to a soft green under-light in the Skills scene's
 * left column: a subtle atmospheric wash, no visible geometry. The light
 * brightens slightly when a skill group is hovered.
 */
export default function StackCore() {
  const glow = useRef();
  useFrame(() => {
    const g = glow.current;
    if (!g || (g.parent && !g.parent.visible)) return;
    const hovered = useStore.getState().hoveredSkillCube;
    const target = hovered != null ? 5.5 : 3.5;
    g.intensity += (target - g.intensity) * 0.08;
  });

  return (
    <pointLight ref={glow} position={[0, -0.6, 0.6]} intensity={3.5} color={PALETTE.green} distance={6} />
  );
}
