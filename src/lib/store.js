// ============================================================
//  Global store — one source of truth shared by the 3D canvas
//  and the DOM/HUD layers. Kept deliberately small.
// ============================================================
import { create } from "zustand";
import { sectionFromProgress } from "./sections";

export const useStore = create((set, get) => ({
  // ---- scroll ----
  scrollProgress: 0, // 0→1 across the whole page
  activeSection: "landing",
  setScrollProgress: (p) => {
    const next = sectionFromProgress(p);
    const prev = get().activeSection;
    set(
      prev === next
        ? { scrollProgress: p }
        : { scrollProgress: p, activeSection: next }
    );
  },

  // ---- performance / accessibility ----
  liteMode: false,
  setLiteMode: (v) => set({ liteMode: v }),
  toggleLiteMode: () => set((s) => ({ liteMode: !s.liteMode })),

  ready: false, // loader finished
  setReady: (v) => set({ ready: v }),

  // ---- skills HUD: which monument is selected ----
  selectedSkill: "react",
  setSelectedSkill: (id) => set({ selectedSkill: id }),

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
