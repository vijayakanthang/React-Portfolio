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

// Exact clip names in cartoon-boy.glb carry odd spacing ("Pose  7"), so match
// on a whitespace-normalised name. "TPose" / "Pose 7" / "Pose 29" all resolve.
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const findClip = (names, target) => {
  const t = norm(target);
  return names.find((n) => norm(n) === t) || names.find((n) => norm(n).includes(t)) || null;
};

/**
 * Scroll-window state. A model owns a [start,end] slice of scrollProgress and
 * fades in/out at the edges; faceReveal also rotates it back→front. A window
 * that starts at the very top (start<=0) is shown immediately — no fade-in pop
 * on first load. Non-overlapping windows keep one avatar on screen at a time.
 */
function windowState(p, [start, end], fade, faceReveal, baseY) {
  const inR = start <= 0 ? 1 : smoothstep(start, start + fade, p);
  const outR = 1 - smoothstep(end - fade, end, p);
  const opacity = clamp01(Math.min(inR, outR));
  let rotY = baseY;
  if (faceReveal) {
    const r = smoothstep(start, end - fade, p); // 0 → 1 over the window
    rotY = baseY + Math.PI * (1 - r);           // back (π) → front (0)
  }
  return { opacity, visible: opacity > 0.01, rotY };
}

/* ---------------- GLB figure (full mode) ---------------- */
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

  // per-instance clone + materials so opacity / silhouette are independent
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
      // Keep depth writing ON so clothing meshes always occlude the body —
      // otherwise the transparent pass can sort the body in front of the
      // hoodie/pants and the character renders "without dress".
      o.material.transparent = true;
      o.material.depthWrite = true;
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

  // dispose only the per-instance cloned materials on unmount (e.g. lite
  // toggle). Geometry is shared by SkeletonUtils.clone with the cached scene
  // and the other avatar instances, so it must NOT be disposed here.
  useEffect(() => {
    const mats = materials;
    return () => mats.forEach((mat) => mat.dispose());
  }, [materials]);

  const { actions, names } = useAnimations(animations, model);
  const clipNames = useMemo(
    () => poses.map((t) => findClip(names, t)).filter(Boolean),
    [names, poses]
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      const missing = poses.filter((t) => !findClip(names, t));
      if (missing.length) console.warn("[Avatar] unresolved poses", missing, "— available:", names);
    }
    if (clipNames.length === 0) return undefined;
    const multi = clipNames.length > 1;
    clipNames.forEach((n) => {
      const a = actions[n];
      if (!a) return;
      a.reset();
      a.play();
      a.paused = true;                 // single-keyframe poses → hold the frame
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

    for (let i = 0; i < materials.length; i++) materials[i].opacity = opacity;

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

/* ---------------- green glowing dot (lite / mobile) ---------------- */
function AvatarDot({ visWindow = [0, 1], fade = 0.04, position = [0, 0, 0] }) {
  const group = useRef();
  const halo = useRef();
  const coreMat = useRef();
  const haloMat = useRef();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = useStore.getState().scrollProgress;
    const { opacity, visible } = windowState(p, visWindow, fade, false, 0);
    g.visible = visible;
    if (!visible) return;
    const t = state.clock.elapsedTime;
    g.position.set(position[0], position[1] + 1.0 + Math.sin(t * 1.6) * 0.06, position[2]);
    if (halo.current) halo.current.scale.setScalar(1 + Math.sin(t * 3) * 0.18);
    if (coreMat.current) coreMat.current.opacity = opacity;
    if (haloMat.current) haloMat.current.opacity = 0.35 * opacity;
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial ref={coreMat} color={PALETTE.hot} transparent toneMapped={false} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshBasicMaterial
          ref={haloMat}
          color={PALETTE.green}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={PALETTE.green} intensity={6} distance={5} />
    </group>
  );
}

/* ---------------- public Avatar ---------------- */
export default function Avatar(props) {
  const lite = useStore((s) => s.liteMode);
  const isMobile = useIsMobile();
  // Lite / mobile: never fetch the GLB — show a small green glowing dot.
  if (lite || isMobile) return <AvatarDot {...props} />;
  // Full mode: model is preloaded behind the boot loader, so no visible
  // fallback is needed (null avoids a partial / undressed flash).
  return (
    <Suspense fallback={null}>
      <AvatarModel {...props} />
    </Suspense>
  );
}
