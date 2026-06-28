import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import { useStore } from "../lib/store";
import { useIsMobile } from "../hooks/useMediaQuery";
import { clamp01, smoothstep } from "../lib/sections";
import { PALETTE } from "../lib/palette";

const MODEL_URL = "/models/cartoon-boy.glb";
const TARGET_H = 1.9;       // normalised height in world units
const MODEL_YAW = 0;        // flip to Math.PI if the model faces the wrong way

// Exact animation clip names baked into cartoon-boy.glb (Blender export):
//   "Am male cartoon|A|TPose", "Pose  7", "Pose  14", "Pose  23",
//   "Pose  27", "Pose  29"   — note the double spaces.
// Each is a SINGLE-keyframe static pose covering the whole skeleton, with
// its lone keyframe sitting at a non-zero time. We resolve requested names
// by whitespace-normalised matching so "Pose 7" / "TPose" both work.
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const findClip = (names, target) => {
  const t = norm(target);
  return (
    names.find((n) => norm(n) === t) ||
    names.find((n) => norm(n).includes(t)) ||
    null
  );
};

/**
 * Scroll-window state: a model owns a [start,end] slice of scrollProgress.
 * It fades in/out at the edges and (for the landing reveal) rotates from
 * back-facing to front-facing across the window. Non-overlapping windows
 * guarantee only one avatar is ever on screen.
 */
function windowState(p, [start, end], fade, faceReveal, baseY) {
  const inR = smoothstep(start, start + fade, p);
  const outR = 1 - smoothstep(end - fade, end, p);
  const opacity = clamp01(Math.min(inR, outR));
  let rotY = baseY;
  if (faceReveal) {
    const r = smoothstep(start, end - fade, p); // 0 → 1 over the window
    rotY = baseY + Math.PI * (1 - r);           // back (π) → front (0)
  }
  return { opacity, visible: opacity > 0.01, rotY };
}

/* ---------------- GLB figure ---------------- */
function AvatarModel({
  poses = ["Pose 7"],
  silhouette = false,
  visWindow = [0, 1],
  fade = 0.04,
  faceReveal = false,
  track = true,
  baseRotationY = 0,
  scale = 1,
  position = [0, 0, 0],
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL_URL);
  const baseY = baseRotationY + MODEL_YAW;

  // per-instance clone + materials (so opacity/silhouette are independent)
  const { model, materials } = useMemo(() => {
    const c = SkeletonUtils.clone(scene);
    const mats = [];
    c.traverse((o) => {
      if (!o.isMesh) return;
      o.frustumCulled = false;
      o.material = o.material.clone();
      if (silhouette) {
        o.material.map = null;
        if ("color" in o.material) o.material.color = new THREE.Color("#03150c");
        if ("emissive" in o.material) o.material.emissive = new THREE.Color("#000000");
        if ("metalness" in o.material) o.material.metalness = 0;
        if ("roughness" in o.material) o.material.roughness = 1;
      }
      o.material.transparent = true;
      mats.push(o.material);
    });
    const box = new THREE.Box3().setFromObject(c);
    const size = new THREE.Vector3();
    box.getSize(size);
    const s = size.y > 0.0001 ? TARGET_H / size.y : 1;
    c.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(c);
    c.position.y = -b2.min.y;
    c.position.x = -(b2.min.x + b2.max.x) / 2;
    c.position.z = -(b2.min.z + b2.max.z) / 2;
    return { model: c, materials: mats };
  }, [scene, silhouette]);

  const { actions, names } = useAnimations(animations, model);
  const clipNames = useMemo(
    () => poses.map((t) => findClip(names, t)).filter(Boolean),
    [names, poses]
  );

  useEffect(() => {
    if (import.meta.env.DEV && clipNames.length !== poses.length) {
      // surface any pose name that didn't resolve against the GLB
      const missing = poses.filter((t) => !findClip(names, t));
      if (missing.length) console.warn("[Avatar] unresolved poses", missing, "— available:", names);
    }
    if (clipNames.length === 0) return undefined;

    const multi = clipNames.length > 1;
    clipNames.forEach((n) => {
      const a = actions[n];
      if (!a) return;
      // Each clip is one static keyframe → pin the action paused on that
      // keyframe with full weight; the mixer then holds the pose every frame.
      a.reset();
      a.play();
      a.paused = true;
      a.time = a.getClip().duration;
      a.setEffectiveTimeScale(1);
      a.setEffectiveWeight(multi ? 0 : 1);
    });
    return () => clipNames.forEach((n) => actions[n] && actions[n].stop());
  }, [actions, clipNames, names, poses]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = useStore.getState().scrollProgress;
    const { opacity, visible, rotY } = windowState(p, visWindow, fade, faceReveal, baseY);
    g.visible = visible;
    if (!visible) return;

    for (let i = 0; i < materials.length; i++) {
      materials[i].opacity = opacity;
      materials[i].depthWrite = opacity > 0.9;
    }

    const t = state.clock.elapsedTime;
    g.position.y = position[1] + Math.sin(t * 1.2) * 0.012;

    if (faceReveal) {
      g.rotation.y = rotY;
    } else if (track) {
      const tx = THREE.MathUtils.clamp(state.pointer.x, -1, 1) * 0.3;
      const ty = THREE.MathUtils.clamp(state.pointer.y, -1, 1) * 0.1;
      g.rotation.y += (baseY + tx - g.rotation.y) * 0.05;
      g.rotation.x += (-ty - g.rotation.x) * 0.05;
    } else {
      g.rotation.y = baseY;
    }

    // crossfade carousel across multiple poses (the silhouette blend)
    if (clipNames.length > 1) {
      const n = clipNames.length;
      const phase = ((t * 0.25) % n + n) % n;
      for (let i = 0; i < n; i++) {
        let d = Math.abs(phase - i);
        d = Math.min(d, n - d);
        const a = actions[clipNames[i]];
        if (a) a.setEffectiveWeight(Math.max(0, 1 - d));
      }
    }
  });

  return (
    <group ref={group} position={position} rotation={[0, baseY, 0]} scale={scale}>
      <primitive object={model} />
    </group>
  );
}

/* ---------------- primitive fallback ---------------- */
function AvatarPrimitive({
  silhouette = false,
  visWindow = [0, 1],
  fade = 0.04,
  faceReveal = false,
  track = true,
  baseRotationY = 0,
  scale = 1,
  position = [0, 0, 0],
}) {
  const group = useRef();
  const head = useRef();
  const baseY = baseRotationY + MODEL_YAW;
  const color = silhouette ? "#03150c" : PALETTE.green;

  const skin = () => (
    <meshStandardMaterial
      color={color} emissive={silhouette ? "#000000" : color}
      emissiveIntensity={silhouette ? 0 : 0.9}
      transparent opacity={0.9} roughness={silhouette ? 1 : 0.4}
      metalness={silhouette ? 0 : 0.2} toneMapped={false}
    />
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = useStore.getState().scrollProgress;
    const { opacity, visible, rotY } = windowState(p, visWindow, fade, faceReveal, baseY);
    g.visible = visible;
    if (!visible) return;
    g.scale.setScalar(scale * (0.6 + 0.4 * opacity));
    const t = state.clock.elapsedTime;
    g.position.y = position[1] + Math.sin(t * 1.3) * 0.02;
    if (faceReveal) {
      g.rotation.y = rotY;
    } else {
      g.rotation.y = baseY;
      if (head.current && track) {
        const tx = THREE.MathUtils.clamp(state.pointer.x, -1, 1) * 0.5;
        const ty = THREE.MathUtils.clamp(state.pointer.y, -1, 1) * 0.3;
        head.current.rotation.y += (tx - head.current.rotation.y) * 0.08;
        head.current.rotation.x += (-ty - head.current.rotation.x) * 0.08;
      }
    }
  });

  return (
    <group ref={group} position={position} rotation={[0, baseY, 0]} scale={scale}>
      <group ref={head} position={[0, 1.62, 0]}>
        <mesh><sphereGeometry args={[0.17, 24, 24]} />{skin()}</mesh>
        {!silhouette && (
          <mesh position={[0, 0.01, 0.14]}>
            <boxGeometry args={[0.22, 0.05, 0.06]} />
            <meshStandardMaterial color={PALETTE.hot} emissive={PALETTE.hot} emissiveIntensity={2.4} toneMapped={false} />
          </mesh>
        )}
      </group>
      <mesh position={[0, 1.42, 0]}><cylinderGeometry args={[0.06, 0.07, 0.12, 12]} />{skin()}</mesh>
      <mesh position={[0, 1.05, 0]}><capsuleGeometry args={[0.22, 0.45, 8, 18]} />{skin()}</mesh>
      <mesh position={[-0.3, 1.02, 0]} rotation={[0, 0, 0.18]}><capsuleGeometry args={[0.06, 0.5, 6, 12]} />{skin()}</mesh>
      <mesh position={[0.3, 1.02, 0]} rotation={[0, 0, -0.18]}><capsuleGeometry args={[0.06, 0.5, 6, 12]} />{skin()}</mesh>
      <mesh position={[-0.11, 0.4, 0]}><capsuleGeometry args={[0.08, 0.6, 6, 12]} />{skin()}</mesh>
      <mesh position={[0.11, 0.4, 0]}><capsuleGeometry args={[0.08, 0.6, 6, 12]} />{skin()}</mesh>
    </group>
  );
}

/* ---------------- public Avatar ---------------- */
export default function Avatar(props) {
  const lite = useStore((s) => s.liteMode);
  const isMobile = useIsMobile();
  if (lite || isMobile) return <AvatarPrimitive {...props} />;
  return (
    <Suspense fallback={<AvatarPrimitive {...props} />}>
      <AvatarModel {...props} />
    </Suspense>
  );
}
