import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "../three/Avatar";
import { useStore } from "../lib/store";
import { nearBand } from "../lib/sections";
import { PALETTE } from "../lib/palette";

/** Concentric glowing rings on the floor beneath the avatar. */
function FloorRings() {
  const ref = useRef();
  useFrame((state, dt) => {
    if (ref.current && ref.current.parent?.visible) ref.current.rotation.z += dt * 0.05;
  });
  const radii = [1.1, 1.6, 2.2, 3.0];
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      {radii.map((r, i) => (
        <mesh key={r}>
          <ringGeometry args={[r, r + (i === 0 ? 0.06 : 0.02), 80]} />
          <meshBasicMaterial
            color={i % 2 ? PALETTE.greenSoft : PALETTE.green}
            transparent
            opacity={0.5 - i * 0.09}
            toneMapped={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** A small floating holographic laptop near the avatar. */
function HoloLaptop() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
  });
  return (
    <group ref={ref} position={[1.25, -0.15, 0.7]} rotation={[0, -0.5, 0]} scale={0.8}>
      {/* base */}
      <mesh rotation={[-0.5, 0, 0]} position={[0, -0.02, 0.18]}>
        <boxGeometry args={[0.62, 0.02, 0.42]} />
        <meshStandardMaterial color="#03200f" emissive={PALETTE.green} emissiveIntensity={0.25} toneMapped={false} />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0.2, 0]} rotation={[0.15, 0, 0]}>
        <planeGeometry args={[0.62, 0.4]} />
        <meshBasicMaterial color={"#04240f"} transparent opacity={0.9} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* code lines */}
      {[0.12, 0.06, 0, -0.06, -0.12].map((y, i) => (
        <mesh key={y} position={[-0.18 + (i % 2) * 0.04, 0.2 + y, 0.01]} rotation={[0.15, 0, 0]}>
          <planeGeometry args={[0.26 - (i % 3) * 0.06, 0.018]} />
          <meshBasicMaterial color={PALETTE.green} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

export default function AboutScene() {
  const group = useRef();
  useFrame(() => {
    const p = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = nearBand("about", p, 0.03);
  });

  return (
    <group ref={group} visible={false} position={[0, -0.7, 0]}>
      <Avatar
        poses={["Pose 29"]}
        visWindow={[0.17, 0.4]}
        fade={0.035}
        track
        baseRotationY={0}
        position={[0, 0, 0]}
        scale={1}
      />
      <FloorRings />
      <HoloLaptop />

      {/* faint code panels behind */}
      <mesh position={[-1.4, 0.7, -0.6]} rotation={[0, 0.5, 0]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial color={"#062b14"} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* lighting: green key + rim + soft front fill */}
      <pointLight position={[1.6, 2.4, 2]} intensity={14} color={PALETTE.green} distance={14} />
      <pointLight position={[-2, 1, -1.5]} intensity={9} color={PALETTE.greenSoft} distance={10} />
      <pointLight position={[0, 0.4, 2.6]} intensity={4} color={PALETTE.hot} distance={8} />
    </group>
  );
}
