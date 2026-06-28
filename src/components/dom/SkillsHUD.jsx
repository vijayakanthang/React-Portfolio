import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiMongodb, SiPython,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { FiZap, FiShield, FiBookOpen, FiDroplet, FiCrosshair } from "react-icons/fi";
import { useStore } from "../../lib/store";
import { skills, passives } from "../../data/profile";

const ICONS = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  node: SiNodedotjs,
  mongodb: SiMongodb,
  python: SiPython,
  cloud: FaAws,
};

// little constellation positions (viewBox 0..100) for the skill-map graph
const NODES = {
  javascript: [50, 30], typescript: [70, 22], react: [32, 24],
  nextjs: [60, 50], node: [40, 52], mongodb: [78, 58],
  python: [20, 46], cloud: [86, 38],
};
const EDGES = [
  ["react", "javascript"], ["javascript", "typescript"], ["javascript", "nextjs"],
  ["nextjs", "node"], ["node", "mongodb"], ["python", "react"], ["typescript", "cloud"],
];

const HOTBAR = [FiCrosshair, FiShield, FiZap, FiBookOpen, FiDroplet];

export default function SkillsHUD() {
  const selectedId = useStore((s) => s.selectedSkill);
  const select = useStore((s) => s.setSelectedSkill);
  const skill = skills.find((s) => s.id === selectedId) ?? skills[0];
  const Icon = ICONS[skill.id] ?? FiZap;

  return (
    <div className="skills-hud">
      {/* TOP-LEFT — crest, vitals, title */}
      <div className="hud-cluster hud-tl">
        <div className="crest" aria-hidden="true">◈</div>
        <div className="vitals">
          <span className="bar bar-hp"><i style={{ width: "82%" }} /></span>
          <span className="bar bar-mp"><i style={{ width: "64%" }} /></span>
          <span className="bar bar-st"><i style={{ width: "90%" }} /></span>
        </div>
        <h2 className="hud-title">SKILLS</h2>
      </div>

      {/* TOP-RIGHT — level + skill map */}
      <div className="hud-cluster hud-tr">
        <div className="lvl-box">
          <div className="lvl-row"><span>LVL</span><b>25</b></div>
          <div className="lvl-row dim"><span>EXP</span><b>8740 / 10000</b></div>
        </div>
        <div className="skill-map">
          <p className="map-label">SKILL MAP</p>
          <svg viewBox="0 0 100 75" className="map-svg" role="presentation">
            {EDGES.map(([a, b], i) => (
              <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} className="map-edge" />
            ))}
            {skills.map((s) => {
              const [x, y] = NODES[s.id] ?? [50, 50];
              return (
                <g key={s.id} className={`map-node${s.id === selectedId ? " on" : ""}`} onClick={() => select(s.id)}>
                  <circle cx={x} cy={y} r={s.id === selectedId ? 3.4 : 2.4} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* CENTER — the skill rail (also drives the 3D monuments) */}
      <div className="hud-rail" role="listbox" aria-label="Skills">
        {skills.map((s) => {
          const SkIcon = ICONS[s.id] ?? FiZap;
          return (
            <button
              key={s.id}
              type="button"
              role="option"
              aria-selected={s.id === selectedId}
              className={`rail-node${s.id === selectedId ? " on" : ""}`}
              style={{ "--c": s.color }}
              onMouseEnter={() => select(s.id)}
              onFocus={() => select(s.id)}
              onClick={() => select(s.id)}
            >
              <SkIcon />
              <span className="rail-name">{s.name}</span>
              <span className="rail-lvl">LVL {s.level}</span>
            </button>
          );
        })}
      </div>

      {/* BOTTOM-LEFT — current passives */}
      <div className="hud-cluster hud-bl">
        <p className="cluster-h">CURRENT PASSIVES</p>
        <ul className="passive-list">
          {passives.map((p) => (
            <li key={p.id}><span className="p-dot" />{p.name}<b>{p.stat}</b></li>
          ))}
        </ul>
      </div>

      {/* BOTTOM-RIGHT — selected skill detail */}
      <div className="hud-cluster hud-br" style={{ "--c": skill.color }}>
        <div className="detail-head">
          <span className="detail-icon"><Icon /></span>
          <div>
            <h3>{skill.name}</h3>
            <p className="detail-lvl">LEVEL {skill.level}</p>
          </div>
          <span className="detail-exp mono">EXP {skill.exp} / 10000</span>
        </div>
        <span className="bar bar-exp"><i style={{ width: `${(skill.exp / 10000) * 100}%` }} /></span>
        <p className="detail-desc">{skill.blurb}</p>
        <p className="cluster-h sm">ABILITIES UNLOCKED</p>
        <ul className="ability-row">
          {skill.abilities.map((a) => (
            <li key={a}><FiZap /> {a}</li>
          ))}
        </ul>
      </div>

      {/* BOTTOM-CENTER — ability hotbar */}
      <div className="hud-hotbar" aria-hidden="true">
        {HOTBAR.map((H, i) => (
          <span key={i} className={`slot${i === 2 ? " active" : ""}`}><H /></span>
        ))}
      </div>

      <div className="hud-hint" aria-hidden="true"><kbd>E</kbd> VIEW MASTERY TREE</div>
    </div>
  );
}
