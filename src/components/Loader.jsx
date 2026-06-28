import { useEffect, useRef, useState } from "react";

const GLYPHS = "アイウエオカキクケコ01<>=*+ﾊﾋﾌﾍﾎ";
const scramble = (n) =>
  Array.from({ length: n }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");

/** Matrix "decrypting" boot loader. Calls onDone when it reaches 100%. */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [glyphs, setGlyphs] = useState(scramble(18));
  const done = useRef(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const elapsed = t - start;
      const p = Math.min(100, Math.round((elapsed / 1600) * 100));
      setPct(p);
      setGlyphs(scramble(18));
      if (p >= 100) {
        if (!done.current) {
          done.current = true;
          setTimeout(onDone, 250);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="loader">
      <div className="loader-inner">
        <p className="loader-glyphs mono">{glyphs}</p>
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="loader-pct mono">DECRYPTING WORLD · {pct}%</p>
      </div>
    </div>
  );
}
