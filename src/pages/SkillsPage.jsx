import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SolarSystem from "../components/SolarSystem";

export default function SkillsPage() {
  const [hovered, setHovered] = useState(null);
  const isMobile = window.innerWidth < 900;

  const groups = useMemo(
    () => [
      {
        title: "Frontend",
        radius: 3.5,
        speed: 0.004,
        color: "#00f0ff",
        size: 0.28,
        items: ["React", "Next.js", "TypeScript", "HTML5", "CSS3"],
      },
      {
        title: "Backend",
        radius: 5.5,
        speed: 0.0025,
        color: "#4ade80",
        size: 0.22,
        items: ["Node.js", "Express", "Strapi", "MongoDB", "MySQL"],
      },
      {
        title: "Cloud/Tools",
        radius: 7.5,
        speed: 0.0015,
        color: "#f59e0b",
        size: 0.18,
        items: ["Azure", "Git", "Vercel", "REST APIs"],
      },
    ],
    [],
  );

  return (
    <section id="skills" className="page-section section skills-v3">
      <div className="section-shell">
        <p className="section-eyebrow mono">SKILLS / SOLAR SYSTEM</p>
        <h2 className="section-title">Skills as planets, tools as moons.</h2>
      </div>

      <div className="skills-v3__canvas-wrap">
        <SolarSystem groups={groups} hovered={hovered} setHovered={setHovered} isMobile={isMobile} />

        <AnimatePresence>
          {hovered ? (
            <motion.aside
              key={hovered.title}
              className="skills-info-panel"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
            >
              <h3>{hovered.title}</h3>
              <ul>
                {hovered.items.map((item) => (
                  <li key={item}><span />{item}</li>
                ))}
              </ul>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
