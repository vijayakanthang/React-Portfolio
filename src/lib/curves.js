// ============================================================
//  Curve math for the Landing → About transition.
//  The infinity loop (lemniscate of Gerono, a figure-8) morphs
//  into a wavy horizontal "path" as scroll progresses.
// ============================================================
import * as THREE from "three";

// Lemniscate of Gerono — a clean figure-8 centred on the origin.
//   x = a·cos(t),  y = (a·sin(t)·cos(t)),  t ∈ [0, 2π]
export function lemniscatePoint(t, a = 1) {
  const x = a * Math.cos(t);
  const y = a * Math.sin(t) * Math.cos(t);
  return new THREE.Vector3(x, y, 0);
}

// Target "path" point for the same parameter t — a gently undulating
// ribbon that stretches forward in -Z, so the loop unrolls into a road.
export function pathPoint(t, a = 1) {
  const u = t / (Math.PI * 2); // 0→1 along the curve
  const x = (u - 0.5) * a * 4; // spread sideways into a long ribbon
  const y = Math.sin(t * 2) * a * 0.18 - 0.4; // soft waves, dropped down
  const z = -u * a * 6; // recede into the distance
  return new THREE.Vector3(x, y, z);
}

// Build the array of points for a given morph amount (0 = loop, 1 = path).
export function morphedPoints(segments = 220, a = 1, morph = 0) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const loop = lemniscatePoint(t, a);
    const path = pathPoint(t, a);
    pts.push(loop.clone().lerp(path, morph));
  }
  return pts;
}

// A reusable Catmull-Rom curve through morphed points (for TubeGeometry).
export function morphedCurve(segments = 220, a = 1, morph = 0) {
  return new THREE.CatmullRomCurve3(
    morphedPoints(segments, a, morph),
    false,
    "catmullrom",
    0.5
  );
}
