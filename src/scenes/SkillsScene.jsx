import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import StackCore from "../three/StackCore";
import { useStore } from "../lib/store";
import { nearBand } from "../lib/sections";
import { PALETTE } from "../lib/palette";

/**
 * Skills scene — a subtle green atmospheric wash in the left column. The avatar
 * and 3D geometry are intentionally absent; the DOM skill panels are the
 * subject and the scene just lights their backdrop.
 */
export default function SkillsScene() {
  const group = useRef();

  useFrame(() => {
    const p = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = nearBand("skills", p, 0.03);
  });

  return (
    <group ref={group} visible={false} position={[-2.35, 0.2, 0]}>
      <ambientLight intensity={0.2} />
      <StackCore />
    </group>
  );
}
