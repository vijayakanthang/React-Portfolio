import { motion } from "framer-motion";
import RadarChart from "../components/RadarChart";
import SectionHeader from "../components/SectionHeader";
import { skillGroups, skillOverview } from "../data/siteContent";

export default function SkillsPage() {
  let pillIndex = 0;

  return (
    <section id="skills" className="page-section section section--skills">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              Visual strengths across product, platform, and <span>performance</span>
            </>
          }
          subtitle="Radar overview, specialty meters, and a tagged stack grouped by focus area."
        />

        <div className="skills-layout">
          <motion.div
            className="skills-panel radar-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <RadarChart categories={skillOverview} />
          </motion.div>

          <motion.div
            className="skills-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className="skill-meter-list">
              {skillOverview.map((item, index) => (
                <div key={item.label} className="skill-meter">
                  <div className="skill-meter__meta">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="skill-meter__track">
                    <motion.span
                      className="skill-meter__fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                    />
                  </div>
                  <p className="skill-meter__detail">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="skill-pill-groups">
              {skillGroups.map((group) => (
                <div key={group.title} className="skill-pill-group">
                  <p className="skill-pill-group__title">{group.title}</p>
                  <div className="skill-pill-group__items">
                    {group.items.map((skill) => {
                      pillIndex += 1;

                      return (
                        <motion.span
                          key={skill}
                          className={`skill-pill skill-pill--${group.tone}`}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.35, delay: pillIndex * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
