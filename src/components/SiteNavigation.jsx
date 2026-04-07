import { useEffect, useMemo, useState } from "react";
import { navigationItems, profile } from "../data/siteContent";

export default function SiteNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionIdSet = useMemo(() => new Set(navigationItems.map((item) => item.id)), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

       const scrollTop = window.scrollY;
       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
       setProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0);
    };

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
      {
        threshold: 0.45,
        rootMargin: "-15% 0px -35% 0px",
      },
    );

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`site-nav ${isScrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <button type="button" className="brand-mark" onClick={() => scrollToSection("home")}>
        <span className="brand-mark__initials">VG</span>
        <div className="brand-mark__text">
          <span className="brand-mark__title">{profile.name}</span>
          <span className="brand-mark__subtitle">{profile.roleStack}</span>
        </div>
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-link ${activeSection === item.id ? "nav-link--active" : ""}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <a
        className="nav-resume"
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
      >
        Resume
      </a>
    </header>
  );
}
