import { useEffect, useRef, useState } from "react";
import {
  FiCode, FiServer, FiDatabase, FiCloud, FiTerminal, FiCpu, FiZap, FiArrowUpRight,
} from "react-icons/fi";
import { useStore } from "../../lib/store";
import { skillGroups, engineeringSignal, links } from "../../data/profile";

const ICONS = {
  code: FiCode,
  server: FiServer,
  database: FiDatabase,
  cloud: FiCloud,
  terminal: FiTerminal,
  cpu: FiCpu,
};

/** once-only reveal flag; true immediately if IO is unavailable / reduced motion */
function useReveal(reduced) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return [ref, seen];
}

/**
 * SKILLS — "THE STACK CORE". The 3D core lives in the WebGL layer on the left;
 * this DOM layer holds the heading, the 6-group skill grid, and one measurable
 * engineering-signal strip. No levels, EXP, or progress bars — recruiter-
 * readable in seconds, fully present in the DOM without WebGL.
 */
export default function SkillsHUD() {
  const reduced = useStore((s) => s.liteMode); // lite already implies calmer motion
  const setHover = useStore((s) => s.setHoveredSkillCube);
  const [gridRef, seen] = useReveal(reduced);

  return (
    <div className="sk">
      {/* heading + intro (top-left) */}
      <div className="sk-head">
        <p className="sk-index">// 03</p>
        <h2 className="sk-title">SKILLS</h2>
        <p className="sk-intro">
          The tools I use to build scalable, high-performance applications.
        </p>
      </div>

      {/* skill grid — 3×2 on desktop */}
      <div ref={gridRef} className={`sk-grid${seen ? " in" : ""}`}>
        {skillGroups.map((g, i) => {
          const Icon = ICONS[g.icon] ?? FiCode;
          return (
            <section
              key={g.id}
              className="sk-panel"
              style={{ "--i": i }}
              onMouseEnter={() => i < 3 && setHover(i)}
              onMouseLeave={() => i < 3 && setHover(null)}
            >
              <header className="sk-panel-h">
                <span className="sk-panel-ic" aria-hidden="true"><Icon /></span>
                <h3>{g.title}</h3>
              </header>
              <ul className="sk-pills">
                {g.skills.map((s) => (
                  <li key={s} className="sk-pill">{s}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* engineering signal strip */}
      <div className="sk-signal">
        <div className="sk-signal-l">
          <span className="sk-signal-ic" aria-hidden="true"><FiZap /></span>
          <span className="sk-signal-metric">{engineeringSignal.metric}</span>
          <span className="sk-signal-dot" aria-hidden="true" />
          <span className="sk-signal-note">{engineeringSignal.note}</span>
        </div>
        <a className="sk-signal-btn" href={links.github} target="_blank" rel="noreferrer">
          VIEW MY GITHUB <FiArrowUpRight />
        </a>
      </div>
    </div>
  );
}
