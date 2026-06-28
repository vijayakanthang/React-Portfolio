// ============================================================
//  Scene state machine — maps global scrollProgress (0→1)
//  onto the five scenes and their local progress.
//  One continuous world: bands overlap conceptually via blends.
// ============================================================

export const SECTION_IDS = ["landing", "about", "skills", "projects", "contact"];

// Progress bands [start, end] for each scene. Tune freely.
export const BANDS = {
  landing: [0.0, 0.18],
  about: [0.18, 0.4],
  skills: [0.4, 0.62],
  projects: [0.62, 0.84],
  contact: [0.84, 1.0],
};

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const lerp = (a, b, t) => a + (b - a) * t;

// smoothstep — eases a 0→1 ramp so transitions never hard-cut.
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1e-6));
  return t * t * (3 - 2 * t);
};

// Local progress (0→1) of a scroll position within a named band.
export const bandProgress = (id, progress) => {
  const [start, end] = BANDS[id];
  return clamp01((progress - start) / (end - start || 1e-6));
};

// Which section is "active" for a given global progress.
export const sectionFromProgress = (progress) => {
  for (const id of SECTION_IDS) {
    const [, end] = BANDS[id];
    if (progress < end) return id;
  }
  return "contact";
};

// Is the scroll position within (or just outside) a band — used to mount /
// run a scene's frame work only when it's on or near screen.
export const nearBand = (id, progress, margin = 0.06) => {
  const [start, end] = BANDS[id];
  return progress >= start - margin && progress <= end + margin;
};

// 0→1 visibility ramp for a scene: fades in over `fade` at the band start
// and fades out over `fade` at the band end. Used to gate render + opacity.
export const sceneVisibility = (id, progress, fade = 0.05) => {
  const [start, end] = BANDS[id];
  const inRamp = smoothstep(start - fade, start + fade, progress);
  const outRamp = 1 - smoothstep(end - fade, end + fade, progress);
  return clamp01(Math.min(inRamp, outRamp));
};
