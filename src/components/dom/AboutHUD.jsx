import { useEffect, useRef, useState } from "react";
import {
  FiGithub, FiLinkedin, FiMail, FiCalendar, FiMapPin, FiTarget,
  FiActivity, FiCode, FiServer, FiCloud, FiCpu, FiFlag,
} from "react-icons/fi";
import {
  aboutIntro, identityRows, journey, proofOfWork, careerTrace, links,
} from "../../data/profile";

const ICONS = {
  calendar: FiCalendar, pin: FiMapPin, target: FiTarget, signal: FiActivity,
  code: FiCode, server: FiServer, cloud: FiCloud, cpu: FiCpu,
};

/** once-only in-view reveal; resolves true immediately if IO is unavailable */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ className = "", children }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`${className} rv${inView ? " in" : ""}`}>
      {children}
    </div>
  );
}

/**
 * ABOUT — "developer profile / human in the system". Two calm zones: left
 * identity rows, right MY JOURNEY story with proof-of-work blocks and a minimal
 * career trace. All biography text lives in the DOM.
 */
export default function AboutHUD() {
  return (
    <div className="ab">
      {/* ---------- LEFT — identity ---------- */}
      <Reveal className="ab-identity">
        <p className="ab-index">// 02</p>
        <h2 className="ab-title">ABOUT ME</h2>
        <p className="ab-intro">{aboutIntro}</p>

        <ul className="ab-rows">
          {identityRows.map((r) => {
            const Ic = ICONS[r.icon] ?? FiActivity;
            return (
              <li key={r.id} className="ab-row">
                <span className="ab-row-ic" aria-hidden="true"><Ic /></span>
                <div className="ab-row-body">
                  <span className="ab-row-label">{r.label}</span>
                  <span className="ab-row-value">{r.value}</span>
                  {r.sub && <span className="ab-row-sub">{r.sub}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="ab-socials">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={`mailto:${links.email}`} aria-label="Email"><FiMail /></a>
        </div>
      </Reveal>

      {/* ---------- RIGHT — story ---------- */}
      <Reveal className="ab-story">
        <div className="ab-journey">
          <header className="ab-journey-h">
            <FiFlag aria-hidden="true" />
            <h3>MY JOURNEY</h3>
          </header>
          {journey.map((p) => (
            <p key={p.slice(0, 20)} className="ab-para">{p}</p>
          ))}

          <div className="ab-proof">
            {proofOfWork.map((m) => {
              const Ic = ICONS[m.icon] ?? FiCode;
              return (
                <div key={m.id} className="ab-proof-block">
                  <span className="ab-proof-ic" aria-hidden="true"><Ic /></span>
                  <b className="ab-proof-word">{m.word}</b>
                  <span className="ab-proof-label">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* career trace */}
        <ol className="ab-trace">
          {careerTrace.map((c) => (
            <li key={c.id} className="ab-trace-node">
              <span className="ab-trace-dot" aria-hidden="true" />
              <span className="ab-trace-year mono">{c.year}</span>
              <b className="ab-trace-org">{c.org}</b>
              <span className="ab-trace-role">{c.role}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
