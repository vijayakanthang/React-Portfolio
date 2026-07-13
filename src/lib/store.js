// ============================================================
//  Global store — one source of truth shared by the 3D canvas
//  and the DOM/HUD layers. Kept deliberately small.
// ============================================================
import { create } from "zustand";

export const useStore = create((set, get) => ({
  // ---- scroll ----
  scrollProgress: 0, // 0→1 across the whole page
  // Which section owns the viewport — driven by the real DOM section
  // positions (useActiveSection in App), so it stays correct however tall
  // sections grow on any breakpoint. The 3D world keeps using progress BANDS.
  activeSection: "landing",
  setActiveSection: (id) => {
    if (get().activeSection !== id) set({ activeSection: id });
  },
  setScrollProgress: (p) => set({ scrollProgress: p }),

  // ---- performance / accessibility ----
  liteMode: false,
  setLiteMode: (v) => set({ liteMode: v }),
  toggleLiteMode: () => set((s) => ({ liteMode: !s.liteMode })),

  ready: false, // loader finished
  setReady: (v) => set({ ready: v }),

  // ---- skills HUD: which monument is selected ----
  // ---- skills: which group index (0..2 → nearest cube) is hovered, or null.
  // Drives the 3D Stack Core's subtle hover response.
  hoveredSkillCube: null,
  setHoveredSkillCube: (i) => set({ hoveredSkillCube: i }),

  // ---- projects: desktop window manager ----
  // windows: id -> { open, minimized, maximized, z, x, y, w, h }
  // Position/size live here (controlled) so a window keeps its place across
  // minimize → taskbar → restore.
  topZ: 10,
  windows: {},
  // open / restore / focus a window; seeds rect on first open only
  openWindow: (id, rect = {}) =>
    set((s) => {
      const z = s.topZ + 1;
      const cur = s.windows[id] || {};
      return {
        topZ: z,
        windows: {
          ...s.windows,
          [id]: {
            x: cur.x ?? rect.x ?? 60,
            y: cur.y ?? rect.y ?? 50,
            w: cur.w ?? rect.w ?? 440,
            h: cur.h ?? rect.h ?? 300,
            ...cur,
            open: true,
            minimized: false,
            z,
          },
        },
      };
    }),
  closeWindow: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], open: false, minimized: false, maximized: false } },
    })),
  focusWindow: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w || w.minimized || !w.open) return {};
      const z = s.topZ + 1;
      return { topZ: z, windows: { ...s.windows, [id]: { ...w, z } } };
    }),
  minimizeWindow: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return {};
      return { windows: { ...s.windows, [id]: { ...w, minimized: true, maximized: false } } };
    }),
  toggleMaximize: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return {};
      const z = s.topZ + 1;
      return { topZ: z, windows: { ...s.windows, [id]: { ...w, maximized: !w.maximized, minimized: false, z } } };
    }),
  setWindowRect: (id, partial) =>
    set((s) => ({ windows: { ...s.windows, [id]: { ...s.windows[id], ...partial } } })),
}));
