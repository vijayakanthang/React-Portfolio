import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { morphedCurve } from "../lib/curves";
import { smoothstep } from "../lib/sections";
import { useStore } from "../lib/store";
import { PALETTE } from "../lib/palette";

const STEPS = 48; // quantised morph resolution → at most STEPS geometry rebuilds

/**
 * The signature infinity loop. A bright near-white core tube wrapped in an
 * additive green halo. As scroll begins the lemniscate morphs into a path,
 * then the whole thing fades as the world opens into the About scene.
 */
export default function InfinityLoop({ a = 1.7 }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const haloRef = useRef();
  const coreMat = useRef();
  const haloMat = useRef();
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  const morph = step / STEPS;

  const { core, halo } = useMemo(() => {
    const curve = morphedCurve(260, a, morph);
    return {
      core: new THREE.TubeGeometry(curve, 280, 0.038, 16, false),
      halo: new THREE.TubeGeometry(curve, 280, 0.13, 14, false),
    };
  }, [morph, a]);

  useEffect(() => () => { core.dispose(); halo.dispose(); }, [core, halo]);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g || (g.parent && !g.parent.visible)) return; // fade completes before the landing group hides
    const progress = useStore.getState().scrollProgress;

    // morph 0→1 across the opening scroll
    const m = smoothstep(0.02, 0.09, progress);
    const s = Math.round(m * STEPS);
    if (s !== stepRef.current) {
      stepRef.current = s;
      setStep(s);
    }

    // fade the loop out as the world opens
    const vis = 1 - smoothstep(0.09, 0.14, progress);
    if (coreMat.current) coreMat.current.opacity = vis;
    if (haloMat.current) haloMat.current.opacity = 0.5 * vis;

    // gentle life: slow rotation while still a loop, pulse the core
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.04 * (1 - m);
      groupRef.current.rotation.y = (1 - m) * Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
    }
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 2.4 + Math.sin(state.clock.elapsedTime * 2) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <mesh ref={coreRef} geometry={core}>
        <meshStandardMaterial
          ref={coreMat}
          color={PALETTE.hot}
          emissive={PALETTE.hot}
          emissiveIntensity={2.4}
          toneMapped={false}
          transparent
          roughness={0.3}
          metalness={0}
        />
      </mesh>
      <mesh ref={haloRef} geometry={halo}>
        <meshBasicMaterial
          ref={haloMat}
          color={PALETTE.green}
          transparent
          opacity={0.5}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
