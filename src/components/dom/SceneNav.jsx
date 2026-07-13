import { useStore } from "../../lib/store";
import { scrollToId } from "../../hooks/useLenis";
import { sections } from "../../data/profile";

/** Top game-style nav: 01 HOME · 02 ABOUT · 03 SKILLS · 04 PROJECTS · 05 CONTACT */
export default function SceneNav() {
  const active = useStore((s) => s.activeSection);

  return (
    <nav className="scene-nav" aria-label="Sections">
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={`scene-nav-item${active === s.id ? " is-active" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => scrollToId(`#${s.id}`)}
            >
              <span className="num">{String(s.index + 1).padStart(2, "0")}</span>
              <span className="lbl">{s.nav}</span>
            </button>
          </li>
        ))}
        <li>
          {/* recruiter fast path — straight to the PDF, no journey required */}
          <a className="scene-nav-item nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
            <span className="lbl-always">RESUME</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
