import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useStore } from "../../lib/store";
import { smoothstep } from "../../lib/sections";
import { identity, links } from "../../data/profile";

/**
 * Hero overlay for the Landing scene. Fades on the first bit of scroll.
 * Includes the recruiter summary card — name, role, stack and links are
 * readable in the first three seconds, no scrolling required.
 */
export default function LandingCopy() {
  const ref = useRef(null);

  useEffect(() => {
    const apply = (p) => {
      const o = 1 - smoothstep(0.03, 0.12, p);
      const el = ref.current;
      if (!el) return;
      el.style.opacity = o;
      el.style.transform = `translateY(${-p * 80}px)`;
      el.style.pointerEvents = o < 0.1 ? "none" : "auto";
    };
    apply(useStore.getState().scrollProgress);
    return useStore.subscribe((s) => apply(s.scrollProgress));
  }, []);

  return (
    <div ref={ref} className="landing-copy">
      <p className="kicker">WELCOME TO</p>
      <h1 className="hero-title">MY WORLD</h1>

      <div className="hero-card">
        <p className="hero-name">
          {identity.name.toUpperCase()} <span>· {identity.title.toUpperCase()}</span>
        </p>
        <p className="hero-stack mono">{identity.subtitle}</p>
        <div className="hero-links">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={`mailto:${links.email}`} aria-label="Email"><FiMail /></a>
        </div>
      </div>

      <p className="hero-sub">SCROLL TO BEGIN</p>
      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse">
          <span className="wheel" />
        </span>
      </div>
    </div>
  );
}
