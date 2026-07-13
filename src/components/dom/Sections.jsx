import LandingCopy from "./LandingCopy";
import AboutHUD from "./AboutHUD";
import SkillsHUD from "./SkillsHUD";
import ProjectWindows from "./ProjectWindows";
import ContactForm from "./ContactForm";
import { identity, projects } from "../../data/profile";

/**
 * Scrollable content layer above the fixed 3D canvas. Each section is the
 * DOM half of its scene; together they're also the crawlable / keyboard
 * fallback for the whole experience.
 */
export default function Sections() {
  return (
    <div className="content-layer">
      {/* 01 · LANDING */}
      <section id="landing" className="scene-section landing-section">
        <LandingCopy />
      </section>

      {/* 02 · ABOUT — operator dossier + career log */}
      <section id="about" className="scene-section section-about" aria-label="About me">
        <AboutHUD />
      </section>

      {/* 03 · SKILLS — full-bleed game HUD */}
      <section id="skills" className="scene-section section-hud" aria-label="Skills">
        <h2 className="sr-only">Skills — Knowledge District</h2>
        <SkillsHUD />
      </section>

      {/* 04 · PROJECTS — desktop control center with live windows */}
      <section id="projects" className="scene-section section-stage" aria-label="Projects">
        <ProjectWindows />
        {/* crawlable fallback list */}
        <ul className="sr-only">
          {projects.map((p) => (
            <li key={p.id}>
              {p.title}: {p.blurb}
              {p.liveUrl && <a href={p.liveUrl}> live</a>}
              {p.repoUrl && <a href={p.repoUrl}> code</a>}
            </li>
          ))}
        </ul>
      </section>

      {/* 05 · CONTACT */}
      <section id="contact" className="scene-section">
        <div className="panel wide">
          <p className="section-tag">05 · CONTACT</p>
          <h2 className="scene-heading">LET'S BUILD TOGETHER</h2>
          <p className="scene-subhead">Have a project in mind? Send a signal.</p>
          <ContactForm />
          <footer className="world-footer">
            THANK YOU FOR VISITING — LET'S BUILD THE FUTURE TOGETHER
            <span className="copyright">© {new Date().getFullYear()} {identity.name}</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
