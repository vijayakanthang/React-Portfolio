import { useEffect, useRef } from "react";
import { useStore } from "../lib/store";

/**
 * Classic katakana "digital rain" on a 2D canvas, fixed behind the WebGL
 * layer. Cheap (one 2D context), pauses in lite mode, respects DPR cap.
 */
export default function MatrixRain({ opacity = 0.55 }) {
  const canvasRef = useRef(null);
  const liteMode = useStore((s) => s.liteMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });

    const GLYPHS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ﾊﾋﾌﾍﾎ:.=*+-<>";
    const FONT = 16;
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
      cols = Math.ceil(window.innerWidth / FONT);
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
        const x = i * FONT;
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: liteMode ? opacity * 0.5 : opacity,
        pointerEvents: "none",
      }}
    />
  );
}
