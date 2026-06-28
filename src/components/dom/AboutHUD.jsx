import { useState } from "react";
import {
  FiCode, FiCloud, FiBookOpen, FiAward, FiCoffee, FiLock, FiWifi,
  FiGrid, FiTrendingUp, FiChevronRight, FiX, FiGithub, FiLinkedin, FiMail,
} from "react-icons/fi";
import { FaRocket, FaPuzzlePiece, FaBrain, FaGamepad } from "react-icons/fa";
import { scrollToId } from "../../hooks/useLenis";
import {
  identity, about, links, careerObjective, roles, journey, stats, education, interests, quote,
} from "../../data/profile";

const ICON = {
  code: FiCode, cloud: FiCloud, book: FiBookOpen, rocket: FaRocket, puzzle: FaPuzzlePiece,
  trophy: FiAward, coffee: FiCoffee, infinity: FiTrendingUp, brain: FaBrain,
  lock: FiLock, wifi: FiWifi, grid: FiGrid, gamepad: FaGamepad,
};

// where the floating role badges sit around the centred avatar
const ROLE_POS = [
  { top: "13%", left: "32%" },
  { top: "34%", left: "4%" },
  { top: "66%", left: "12%" },
  { top: "24%", right: "6%" },
  { top: "52%", right: "2%" },
];

function Card({ id, title, collapsed, toggle, className = "", children }) {
  const isC = collapsed.has(id);
  return (
    <section className={`a-card ${className}${isC ? " collapsed" : ""}`}>
      <header className="a-card-h">
        <span className="a-card-title">// {title}</span>
        <button
          type="button"
          className="a-card-x"
          onClick={() => toggle(id)}
          aria-expanded={!isC}
          aria-label={`${isC ? "Expand" : "Collapse"} ${title}`}
        >
          <FiX />
        </button>
      </header>
      {!isC && <div className="a-card-body">{children}</div>}
    </section>
  );
}

export default function AboutHUD() {
  const [collapsed, setCollapsed] = useState(new Set());
  const toggle = (id) =>
    setCollapsed((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div className="about-hud">
      {/* ---------- LEFT ---------- */}
      <div className="about-left" data-lenis-prevent>
        <p className="who">// WHO I AM</p>
        <h2 className="about-h">ABOUT ME<span className="cursor">_</span></h2>
        <p className="im">I'M <b>{identity.name.toUpperCase()}</b></p>
        <p className="about-intro">{about.intro}</p>
        <button type="button" className="explore-btn" onClick={() => scrollToId("#skills")}>
          EXPLORE JOURNEY <FiChevronRight />
        </button>
        <div className="about-socials">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={`mailto:${links.email}`} aria-label="Email"><FiMail /></a>
        </div>

        <Card id="journey" title="MY JOURNEY" collapsed={collapsed} toggle={toggle}>
          <ul className="journey">
            {journey.map((j) => (
              <li key={j.year}>
                <span className="j-dot" />
                <div>
                  <b>{j.year}</b>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ---------- CENTER (avatar shows through; badges float) ---------- */}
      <div className="about-center" aria-hidden="true">
        {roles.map((r, i) => {
          const Ic = ICON[r.icon] || FiCode;
          return (
            <div key={r.id} className="role-badge" style={ROLE_POS[i]}>
              <span className="role-ic"><Ic /></span>
              <span className="role-label">{r.label}</span>
            </div>
          );
        })}
      </div>

      {/* ---------- RIGHT ---------- */}
      <div className="about-right" data-lenis-prevent>
        <Card id="objective" title="CAREER OBJECTIVE" collapsed={collapsed} toggle={toggle}>
          <p className="obj-text">{careerObjective}</p>
        </Card>

        <Card id="stats" title="STATS" collapsed={collapsed} toggle={toggle}>
          <div className="stats-grid">
            {stats.map((s) => {
              const Ic = ICON[s.icon] || FiCode;
              return (
                <div key={s.id} className="stat">
                  <span className="stat-ic"><Ic /></span>
                  <b className="stat-val">{s.value}</b>
                  <span className="stat-label">{s.label}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card id="education" title="EDUCATION" collapsed={collapsed} toggle={toggle}>
          <div className="edu">
            <span className="edu-ic"><FiAward /></span>
            <div>
              <b>{education.degree}</b>
              <p>{education.field}</p>
              <p className="edu-school">{education.school}</p>
              <p className="edu-meta">{education.period} · {education.cgpa}</p>
            </div>
          </div>
        </Card>

        <Card id="interests" title="INTERESTS" collapsed={collapsed} toggle={toggle}>
          <div className="interest-row">
            {interests.map((it) => {
              const Ic = ICON[it.icon] || FiCode;
              return (
                <div key={it.id} className="interest">
                  <span className="interest-ic"><Ic /></span>
                  <small>{it.label}</small>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ---------- QUOTE BANNER ---------- */}
      <div className="about-quote">
        <span className="q-mark">“</span>
        <p>{quote}</p>
        <span className="q-mark r">”</span>
      </div>
    </div>
  );
}
