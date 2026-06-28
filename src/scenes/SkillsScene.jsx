import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "../three/Avatar";
import ParticleField from "../three/ParticleField";
import { useStore } from "../lib/store";
import { nearBand } from "../lib/sections";
import { skills } from "../data/profile";
import { PALETTE } from "../lib/palette";

/** One emissive monument: dark plinth + glowing ring + core + vertical beam. */
function Monument({ skill, position }) {
  const group = useRef();
  const ringMat = useRef();
  const coreMat = useRef();
  const beamMat = useRef();
  const color = useMemo(() => new THREE.Color(skill.color), [skill.color]);

  useFrame((state) => {
    const g = group.current;
    if (!g || (g.parent && !g.parent.visible)) return; // skip work when scene is off-band
    const selected = useStore.getState().selectedSkill === skill.id;
    const t = state.clock.elapsedTime;
    const target = selected ? 1 : 0;
    g.userData.k = THREE.MathUtils.lerp(g.userData.k ?? 0, target, 0.08);
    const k = g.userData.k;
    g.scale.setScalar(1 + k * 0.18);
    g.position.y = position[1] + k * 0.12 + Math.sin(t * 1.5 + position[0]) * 0.03;
    if (ringMat.current) {
      ringMat.current.opacity = 0.7 + k * 0.3;
      g.children[1].rotation.z = t * (0.4 + k * 0.8);
    }
    if (coreMat.current) coreMat.current.emissiveIntensity = 1.6 + k * 2.2 + Math.sin(t * 3) * 0.3;
    if (beamMat.current) beamMat.current.opacity = 0.1 + k * 0.35;
  });

  return (
    <group ref={group} position={position}>
      {/* plinth */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.7, 1.2, 0.7]} />
        <meshStandardMaterial color="#04130a" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* glowing ring */}
      <mesh position={[0, 1.7, 0]}>
        <torusGeometry args={[0.42, 0.05, 16, 48]} />
        <meshBasicMaterial ref={ringMat} color={color} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      {/* core */}
      <mesh position={[0, 1.7, 0]}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial ref={coreMat} color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      {/* vertical light beam */}
      <mesh position={[0, 3.6, 0]}>
        <cylinderGeometry args={[0.05, 0.16, 4.2, 12, 1, true]} />
        <meshBasicMaterial
          ref={beamMat}
          color={color}
          transparent
          opacity={0.12}
          toneMapped={false}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function SkillsScene() {
  const group = useRef();
  useFrame(() => {
    const p = useStore.getState().scrollProgress;
    if (group.current) group.current.visible = nearBand("skills", p, 0.03);
  });

  const placed = useMemo(() => {
    const n = skills.length;
    return skills.map((s, i) => {
      const t = i / (n - 1) - 0.5; // -0.5 .. 0.5
      const x = t * 10;
      const z = -3.5 + Math.abs(t) * 1.6; // gentle arc, ends nearer
      return { skill: s, position: [x, 0, z] };
    });
  }, []);

  return (
    <group ref={group} visible={false} position={[0, -1.2, 0]}>
      {/* moonlight + ambient fill */}
      <directionalLight position={[3, 8, 2]} intensity={0.6} color="#bfe9ff" />
      <pointLight position={[0, 2, 3]} intensity={6} color={PALETTE.green} distance={18} />

      {placed.map((m) => (
        <Monument key={m.skill.id} skill={m.skill} position={m.position} />
      ))}

      {/* foreground hero, seen from behind like the reference */}
      <Avatar
        poses={["Pose 7"]}
        visWindow={[0.43, 0.62]}
        fade={0.035}
        track={false}
        baseRotationY={Math.PI}
        position={[0, 0, 2.4]}
        scale={1.15}
      />

      {/* embers drifting up */}
      <ParticleField count={140} spread={16} size={0.04} colorA={PALETTE.green} colorB={PALETTE.hot} speed={0.05} />

      {/* fog-lit ground */}
      <mesh position={[0, -0.01, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 24]} />
        <meshStandardMaterial color="#020a05" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
