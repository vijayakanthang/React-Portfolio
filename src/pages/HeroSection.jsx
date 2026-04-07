import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import HeroBlob from "../components/HeroBlob";
import { profile } from "../data/siteContent";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);
  const letters = useMemo(() => "VIJAYAKANTHAN".split(""), []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("home");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      setScrollProgress(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-letter",
      { opacity: 0, y: 60, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.04, duration: 0.7, ease: "expo.out" },
      0,
    )
      .fromTo(".hero-name-accent", { scale: 0 }, { scale: 1.2, duration: 0.3, ease: "back.out(2)" }, 0.45)
      .to(".hero-name-accent", { scale: 1, duration: 0.22 }, 0.75)
      .fromTo(".hero-role-line", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 0.95)
      .fromTo(".hero-socials a", { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.2 }, 1.1);

    return () => tl.kill();
  }, []);

  return (
    <section id="home" className="page-section hero-v3">
      <HeroBlob scrollProgress={scrollProgress} isMobile={isMobile} />

      <div className="hero-v3__content section-shell">
        <div className="hero-v3__name-wrap" style={{ transform: `translateX(${scrollProgress > 0.7 ? -120 : 0}%)` }}>
          <h1 className="hero-v3__name">
            {letters.map((char, index) => (
              <span key={`${char}-${index}`} className="hero-letter">
                {char}
              </span>
            ))}
            <span className="hero-name-accent">G.</span>
          </h1>
          <p className="hero-role-line">Frontend Engineer  |  React  |  Next.js  |  TypeScript</p>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>

        <p className="hero-v3__vertical">Open to roles  |  Chennai</p>
        <div className="hero-v3__scroll-line" aria-hidden="true" />

        <span className={`hero-v3__chip ${scrollProgress > 0.7 ? "is-visible" : ""}`}>Currently at Klamp.ai</span>
      </div>
    </section>
  );
}