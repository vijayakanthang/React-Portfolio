import { useEffect, useRef } from "react";
import { useStore } from "../lib/store";
import { BANDS, smoothstep } from "../lib/sections";

// Content bands where the rain calms down so panels read clearly.
const CONTENT_BANDS = ["about", "skills", "projects", "contact"];
const DIM_OPACITY = 0.12;

/**
 * Classic katakana "digital rain" on a 2D canvas, fixed behind the WebGL
 * layer. Cheap (one 2D context), pauses in lite mode, respects DPR cap.
 * Fades to a whisper while a content section is in view — panels become
 * "clearings" in the noise — and returns to full during transitions.
 */
export default function MatrixRain({ opacity = 0.55 }) {
  const canvasRef = useRef(null);

  // scroll/lite-driven opacity, applied straight to the element (no re-render)
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return undefined;
    el.style.transition = "opacity 0.5s ease";
    const apply = (s) => {
      const base = s.liteMode ? opacity * 0.5 : opacity;
      let dim = 0;
      for (const id of CONTENT_BANDS) {
        const [start, end] = BANDS[id];
        // ramps sit just inside each band so the rain flares back up briefly
        // at every section boundary — except at the very bottom of the page,
        // where the last panel is still on screen and should stay calm
        const outRamp =
          end >= 0.999 ? 1 : 1 - smoothstep(end - 0.05, end - 0.01, s.scrollProgress);
        const inside =
          smoothstep(start + 0.01, start + 0.05, s.scrollProgress) * outRamp;
        dim = Math.max(dim, inside);
      }
      el.style.opacity = base + (Math.min(DIM_OPACITY, base) - base) * dim;
    };
    apply(useStore.getState());
    return useStore.subscribe(apply);
  }, [opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });

    const GLYPHS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ﾊﾋﾌﾍﾎ:.=*+-<>";
    const FONT = 16;
    let colW = FONT;
    let cols = 0;
    let drops = [];
    let raf;
    let lastFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // mobile: half the columns — same look, half the fillText calls
      colW = FONT * (window.matchMedia("(max-width: 768px)").matches ? 2 : 1);
      cols = Math.ceil(window.innerWidth / colW);
      drops = Array.from({ length: cols }, () =>
        Math.floor((Math.random() * window.innerHeight) / FONT)
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      // throttle to ~20fps — rain doesn't need 60.
      if (now - lastFrame < 50) return;
      lastFrame = now;

      ctx.fillStyle = "rgba(0, 3, 0, 0.10)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${FONT}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * colW;
        const y = drops[i] * FONT;
        // bright leading glyph, dimmer trail
        ctx.fillStyle = Math.random() > 0.975 ? "#cffce0" : "#16f06a";
        ctx.fillText(char, x, y);
        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // opacity is owned by the store-subscription effect above — putting it
      // in this inline style would let any re-render clobber the dimmed value
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
