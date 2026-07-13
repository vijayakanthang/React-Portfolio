import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LandingScene from "../scenes/LandingScene";
import AboutScene from "../scenes/AboutScene";
import SkillsScene from "../scenes/SkillsScene";
import Effects from "../three/Effects";
import { useStore } from "../lib/store";
import { clamp01 } from "../lib/sections";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PALETTE } from "../lib/palette";

// One continuous camera spline through the whole world. Each keyframe is a
// scroll position with a camera position + look-at target; we interpolate
// between adjacent frames so the journey blends instead of cutting.
const KEYFRAMES = [
  { p: 0.0, pos: [0, 0, 6], look: [0, 0, 0] },
  { p: 0.1, pos: [0, 0.9, 4.4], look: [0, -0.3, -1.6] }, // leaving landing
  { p: 0.17, pos: [0.55, 0.45, 4.6], look: [0.55, 0.2, 0] }, // about — avatar sits centre-left behind the story zone
  { p: 0.33, pos: [0.55, 0.45, 4.6], look: [0.55, 0.2, 0] }, // hold through the profile
  { p: 0.45, pos: [-1.0, 0.4, 5.2], look: [-1.0, 0.2, 0] }, // skills — StackCore framed screen-left
  { p: 0.6, pos: [-1.0, 0.4, 5.2], look: [-1.0, 0.2, 0] },
  { p: 0.75, pos: [0, 0.6, 7], look: [0, 0.5, -2.5] }, // projects/contact are DOM-only
  { p: 1.0, pos: [0, 0.4, 5], look: [0, -0.3, 0] },
].map((k) => ({
  p: k.p,
  pos: new THREE.Vector3(...k.pos),
  look: new THREE.Vector3(...k.look),
}));

function cameraTarget(p, pos, look) {
  let i = 0;
  while (i < KEYFRAMES.length - 1 && p > KEYFRAMES[i + 1].p) i++;
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
  const t = clamp01((p - a.p) / (b.p - a.p || 1e-6));
  pos.copy(a.pos).lerp(b.pos, t);
  look.copy(a.look).lerp(b.look, t);
}

function CameraRig({ reduced }) {
  const pos = useRef(new THREE.Vector3(0, 0, 6));
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const curLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = useStore.getState().scrollProgress;
    cameraTarget(p, pos.current, look.current);

    const mx = reduced ? 0 : state.pointer.x * 0.4;
    const my = reduced ? 0 : state.pointer.y * 0.25;

    const cam = state.camera;
    cam.position.x += (pos.current.x + mx - cam.position.x) * 0.06;
    cam.position.y += (pos.current.y + my - cam.position.y) * 0.06;
    cam.position.z += (pos.current.z - cam.position.z) * 0.06;
    curLook.current.lerp(look.current, 0.08);
    cam.lookAt(curLook.current);
  });

  return null;
}

export default function Experience() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const liteMode = useStore((s) => s.liteMode);
  const lite = liteMode || isMobile;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, lite ? 1.4 : 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <fog attach="fog" args={[PALETTE.bg, 7, 26]} />
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <LandingScene />
          <AboutScene />
          <SkillsScene />
          {/* Projects/Contact are DOM-only — no 3D props behind them */}
        </Suspense>
        <CameraRig reduced={reduced} />
        {!lite && <Effects intensity={1.0} />}
      </Canvas>
    </div>
  );
}
