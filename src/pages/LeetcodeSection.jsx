import { SiLeetcode, SiCplusplus, SiPython, SiJavascript } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { codingProfile } from "../data/siteContent";

export default function LeetcodeSection() {
  // Compute ring percentages for the UI
  const total = codingProfile.stats.totalSolved;
  const easyPct = Math.round((codingProfile.stats.easy / 800) * 100);
  const medPct = Math.round((codingProfile.stats.medium / 1600) * 100);
  const hardPct = Math.round((codingProfile.stats.hard / 700) * 100);

  return (
    <section id="leetcode" className="page-section section section--leetcode">
      <div className="section-shell">
        <div className="leetcode-card">
          <div className="leetcode-card__header">
            <h3><SiLeetcode style={{ color: "#ffa116", marginRight: "12px", verticalAlign: "middle" }} />LeetCode <span className="mono leetcode-total">{total} SOLVED</span></h3>
            <p className="mono">@{codingProfile.username}</p>
          </div>

          <div className="leetcode-rings">
            <div className="leetcode-ring-card">
              <div className="leetcode-ring" style={{ "--ring-color": "#00b8a3", "--pct": easyPct }}>
                <span>{codingProfile.stats.easy}</span>
              </div>
              <p className="mono" style={{ color: "#00b8a3" }}>EASY</p>
            </div>
            
            <div className="leetcode-ring-card">
              <div className="leetcode-ring" style={{ "--ring-color": "#ffc01e", "--pct": medPct }}>
                <span>{codingProfile.stats.medium}</span>
              </div>
              <p className="mono" style={{ color: "#ffc01e" }}>MED</p>
            </div>

            <div className="leetcode-ring-card">
              <div className="leetcode-ring" style={{ "--ring-color": "#ff375f", "--pct": hardPct }}>
                <span>{codingProfile.stats.hard}</span>
              </div>
              <p className="mono" style={{ color: "#ff375f" }}>HARD</p>
            </div>
          </div>

          <div className="coding-profile-card__chips">
            <span className="project-tech-pill"><FaJava /> Java</span>
            <span className="project-tech-pill"><SiCplusplus /> C++</span>
            <span className="project-tech-pill"><SiPython /> Python</span>
            <span className="project-tech-pill"><SiJavascript /> JS</span>
          </div>

          <a href={codingProfile.url} target="_blank" rel="noreferrer" className="button button--secondary" style={{ width: "fit-content", marginTop: "1rem" }}>
            View Full Profile →
          </a>
        </div>
      </div>
    </section>
  );
}