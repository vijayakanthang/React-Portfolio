import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiHome, FiLayers, FiMail, FiTool } from "react-icons/fi";
import { profile } from "../data/siteContent";

const MotionSpan = motion.span;

const desktopItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const mobileItems = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "projects", label: "Projects", icon: FiLayers },
  { id: "skills", label: "Skills", icon: FiTool },
  { id: "contact", label: "Contact", icon: FiMail },
  { id: "resume", label: "Resume", icon: FiFileText },
];

export default function SiteNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const sectionIdSet = useMemo(() => new Set(desktopItems.map((item) => item.id)), []);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionIdSet.has(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIdSet]);

  useEffect(() => {
    const handleViewport = () => {
      setScrolled(window.scrollY > 80);
      setIsMobile(window.innerWidth < 768);
    };

    handleViewport();
    window.addEventListener("scroll", handleViewport, { passive: true });
    window.addEventListener("resize", handleViewport);

    return () => {
      window.removeEventListener("scroll", handleViewport);
      window.removeEventListener("resize", handleViewport);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <div className="site-nav__inner">
          <button
            type="button"
            className="site-nav__brand"
            onClick={() => scrollToSection("home")}
            aria-label="Go to Home"
          >
            <span className="site-nav__brand-dot">VG</span>
          </button>

          <nav className="site-nav__links" aria-label="Primary navigation">
            {desktopItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`site-nav__link ${activeSection === item.id ? "is-active" : ""}`}
                onClick={() => scrollToSection(item.id)}
              >
                {activeSection === item.id ? <MotionSpan layoutId="nav-pill" className="site-nav__pill" /> : null}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <a className="site-nav__resume" href={profile.resume} target="_blank" rel="noreferrer">
            Resume -&gt;
          </a>
        </div>
      </header>

      {isMobile ? (
        <nav className={`mobile-dock ${mobileOpen ? "mobile-dock--open" : ""}`} aria-label="Mobile navigation">
          {mobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;

            if (item.id === "resume") {
              return (
                <a key={item.id} className="mobile-dock__item" href={profile.resume} target="_blank" rel="noreferrer">
                  <Icon />
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                className={`mobile-dock__item ${isActive ? "is-active" : ""}`}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
              >
                {isActive ? <MotionSpan layoutId="nav-pill-mobile" className="mobile-dock__pill" /> : null}
                <Icon />
              </button>
            );
          })}
        </nav>
      ) : null}
    </>
  );
}
