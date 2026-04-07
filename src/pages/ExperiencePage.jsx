import { useEffect, useState } from "react";
import { experiences } from "../data/siteContent";
import PinballTracer from "../components/PinballTracer";

function FlipWord({ word, active }) {
  const chars = word.split("");
  return (
    <span className="flip-word">
      {chars.map((target, i) => (
        <span key={`${target}-${i}`} className={`flip-char ${active ? "is-active" : ""}`} style={{ "--letter-index": i }}>
          {target}
        </span>
      ))}
    </span>
  );
}

export default function ExperiencePage() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const isMobile = window.innerWidth < 900;

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("experience");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setProgress(p);
      if (p > 0.15) setActive(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" className="page-section section section--experience pinball-exp">
      <div className="section-shell">
        <p className="section-eyebrow mono">002 / HIGH SCORES</p>
        <h2 className="pinball-title">EXPERIENCE</h2>

        <div className="pinball-lanes">
          {experiences.map((experience, index) => {
            const laneColor = index === 0 ? "#aaff00" : "#00f0ff";
            const localProgress = index === 0 ? progress * 2 : (progress - 0.5) * 2;
            return (
              <article key={experience.company} className="pinball-lane" style={{ "--lane-color": laneColor }}>
                <header>
                  <h3><FlipWord word={experience.company.toUpperCase()} active={active} /></h3>
                  <p className="mono digital-date">{experience.duration.toUpperCase()}</p>
                  <span className={`pinball-badge ${index === 0 ? "is-current" : ""}`}>{index === 0 ? "CURRENT" : "PAST"}</span>
                </header>

                <ul className="pinball-points">
                  {experience.details.map((detail, detailIndex) => {
                    const lit = localProgress > detailIndex / experience.details.length;
                    return (
                      <li key={detail} className={lit ? "is-lit" : ""}>
                        <span className="mono">{(detailIndex + 1) * 700} PTS</span>
                        <p>{detail}</p>
                      </li>
                    );
                  })}
                </ul>

                <div className="experience-tech">
                  {experience.tech.map((item) => (
                    <span key={item} className="experience-tech-pill arcade-token">{item}</span>
                  ))}
                </div>
              </article>
            );
          })}

          {!isMobile ? <PinballTracer progress={progress} /> : null}
        </div>
      </div>
    </section>
  );
}