import React, { useEffect, useState } from "react";
import "../styles/NavigationBar.css";
import "../styles/index.css";

export default function Navbar() {
  const theme = "theme-default";
  const [isSticky, setIsSticky] = useState(false);
  const [currentSection, setCurrentSection] = useState("Vijayakanthan G");

  useEffect(() => {
    document.body.className = theme;

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section, #hero-page");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case "hero-page":
                setCurrentSection("Vijayakanthan G");
                break;
              case "about":
                setCurrentSection("About Me");
                break;
              case "projects":
                setCurrentSection("Projects");
                break;
              case "contact":
                setCurrentSection("Let’s Talk");
                break;
              default:
                setCurrentSection("Vijayakanthan G");
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [theme]);

  // Smooth scroll with navbar offset
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      const yOffset = -45; // navbar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav id="desktop-nav" className={isSticky ? "sticky" : ""}>
      <div className="logo">{currentSection}</div>
      <ul className="nav-links">
        <li><a href="#hero-page" onClick={(e) => handleNavClick(e, "#hero-page")}>Home</a></li>
        <li><a href="#about" onClick={(e) => handleNavClick(e, "#about")}>About</a></li>
        <li><a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>Projects</a></li>
        <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a></li>
      </ul>
    </nav>
  );
}
