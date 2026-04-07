import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { availabilityChips, heroTerminalLines, profile } from "../data/siteContent";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const script = (isMobile ? heroTerminalLines.mobile : heroTerminalLines.desktop).join("\n");
    let index = 0;

    setTypedText("");
    setIsComplete(false);

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(script.slice(0, index));

      if (index >= script.length) {
        window.clearInterval(timer);
        setIsComplete(true);
      }
    }, isMobile ? 16 : 22);

    return () => window.clearInterval(timer);
  }, [isMobile]);

  return (
    <section id="home" className="page-section hero-section">
      <div className="section-shell hero-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="hero-kicker">Developer portfolio / 2026 refresh</p>
          <h1>
            Premium frontend craft with a builder&apos;s eye for <span>performance</span>.
          </h1>
          <p className="hero-description">
            {profile.name} is a frontend-focused software engineer building responsive products
            with React, Next.js, TypeScript, SEO discipline, and clean product execution.
          </p>

          <div className="hero-chip-row">
            {availabilityChips.map((chip) => (
              <span key={chip} className="hero-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <SiLeetcode />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="terminal-window hero-terminal"
          drag={!isMobile}
          dragElastic={0.12}
          dragMomentum={false}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
        >
          <div className="terminal-window__header">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal-window__title">session@portfolio:~</span>
            <span className="terminal-window__hint">drag me</span>
          </div>

          <pre className="terminal-window__body">
            {typedText}
            <span className="terminal-cursor">_</span>
          </pre>

          <motion.div
            className="terminal-window__footer"
            initial={{ opacity: 0, y: 12 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
          >
            <a className="button button--primary" href="#projects">
              View My Work -&gt;
            </a>
            <a
              className="button button--ghost"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
