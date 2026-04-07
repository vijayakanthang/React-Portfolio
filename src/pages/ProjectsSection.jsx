import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SpaceField from "../components/SpaceField";
import { projects } from "../data/siteContent";
import useTilt from "../hooks/useTilt";

function CardPreview({ slug }) {
  if (slug === "draw-free") {
    return (
      <svg viewBox="0 0 260 220" className="preview-svg preview-draw">
        <path d="M20 160 C 60 30, 120 200, 240 40" />
        <path d="M18 175 C 90 70, 130 180, 246 70" />
        <path d="M26 130 C 70 35, 160 165, 238 102" />
      </svg>
    );
  }
  if (slug === "strings") {
    return (
      <div className="preview-phone">
        <div className="preview-phone__head" />
        <div className="preview-phone__messages">
          <p>Hello there</p><p>UI feels smooth</p><p>Ship it</p>
        </div>
      </div>
    );
  }
  if (slug === "inventory") {
    return (
      <svg viewBox="0 0 260 220" className="preview-svg preview-bars">
        <rect x="40" y="130" width="35" height="70" />
        <rect x="105" y="90" width="35" height="110" />
        <rect x="170" y="60" width="35" height="140" />
      </svg>
    );
  }
  return (
    <div className="preview-stamp">
      <span>PUBLISHED</span>
      <p>IEEE XPLORE</p>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  useTilt(".project-float-card", window.innerWidth < 900);

  useEffect(() => {
    if (window.innerWidth < 900 || !sectionRef.current) return undefined;
    const tween = gsap.to(".cards-track", {
      xPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: "+=300%",
      },
    });
    return () => tween.kill();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="page-section section projects-v3">
      <SpaceField />
      <div className="section-shell projects-v3__head">
        <p className="section-eyebrow mono">PROJECTS</p>
      </div>
      <div className="cards-track-wrap">
        <div className="cards-track">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="project-float-card"
              style={{ "--z-depth": `${-index * 40}px`, "--edge": ["#ff2d78", "#00f0ff", "#aaff00", "#b44dff"][index] }}
            >
              <div className="project-float-card__preview"><CardPreview slug={project.slug} /></div>
              <div className="project-float-card__body">
                <p className="mono">{project.category}  |  0{index + 1}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-scene__tags">
                  {project.tech.slice(0, 4).map((item) => <span key={item} className="project-tech-pill">{item}</span>)}
                </div>
                <div className="project-scene__actions">
                  {project.github ? <a className="inline-link" href={project.github} target="_blank" rel="noreferrer">GitHub ?</a> : null}
                  {project.live ? <a className="inline-link" href={project.live} target="_blank" rel="noreferrer">Live ?</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}