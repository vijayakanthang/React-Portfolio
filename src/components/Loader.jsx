import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "../lib/store";
import { useIsMobile } from "../hooks/useMediaQuery";

const GLYPHS = "அஆஇஈஉஊஎஏஐஒகஙசஞடணதநபமயரலவழளறன01<>=*+";
const scramble = (n) =>
  Array.from({ length: n }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");

/**
 * Matrix "decrypting" boot loader. In full mode it stays up until the avatar
 * GLB (and all its pose clips) has fully loaded — so the model pops in complete,
 * never in layers. In lite / mobile mode there's no model, so it just runs a
 * short intro. A hard cap guarantees it never bricks on a slow/failed load.
 */
export default function Loader({ onDone }) {
  const { active, progress, total } = useProgress();
  const lite = useStore((s) => s.liteMode);
  const isMobile = useIsMobile();
  const skipModel = lite || isMobile;

  const [glyphs, setGlyphs] = useState(() => scramble(18));
  const [minDone, setMinDone] = useState(false);
  const done = useRef(false);

  // keep a stable finisher in a ref so the timer effect can run once
  const finishRef = useRef(() => {});
  finishRef.current = () => {
    if (done.current) return;
    done.current = true;
    setTimeout(onDone, 250);
  };

  useEffect(() => {
    const glyphTimer = setInterval(() => setGlyphs(scramble(18)), 70);
    const minTimer = setTimeout(() => setMinDone(true), 1200);
    const capTimer = setTimeout(() => finishRef.current(), 9000); // never hang
    return () => {
      clearInterval(glyphTimer);
      clearTimeout(minTimer);
      clearTimeout(capTimer);
    };
  }, []);

  // model is ready when there's nothing left loading through three's manager
  const modelReady = skipModel || (total > 0 && !active && progress >= 100);

  useEffect(() => {
    if (minDone && modelReady) finishRef.current();
  }, [minDone, modelReady]);

  const pct = skipModel ? (minDone ? 100 : 75) : Math.round(progress);

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
