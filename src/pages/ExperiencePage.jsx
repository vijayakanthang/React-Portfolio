import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import { experiences } from "../data/siteContent";

export default function ExperiencePage() {
  return (
    <section id="experience" className="page-section section section--experience">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Scroll through the work that shaped my <span>frontend craft</span>
            </>
          }
          subtitle="A timeline of product, performance, and cloud-security experience."
        />

        <div className="experience-timeline">
          <motion.div
            className="timeline-progress"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              className={`timeline-item ${index % 2 === 0 ? "timeline-item--left" : "timeline-item--right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <span className={`timeline-node timeline-node--${experience.tone}`} />
              <div className="timeline-card">
                <div className="timeline-card__topline">
                  <span className={`timeline-badge timeline-badge--${experience.tone}`}>
                    {experience.badge}
                  </span>
                  <span className="timeline-company-mark">
                    <FaBriefcase />
                    {experience.company}
                  </span>
                </div>

                <h3>{experience.role}</h3>
                <p className="timeline-meta">
                  {experience.duration} | {experience.location}
                </p>

                <ul className="timeline-points">
                  {experience.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>

                <div className="timeline-tech">
                  {experience.tech.map((item) => (
                    <span key={item} className="timeline-tech__pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
