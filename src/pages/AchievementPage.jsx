import { motion } from "framer-motion";
import { FaFlask, FaArrowRight } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import { achievement } from "../data/siteContent";

export default function AchievementPage() {
  return (
    <section id="achievements" className="page-section section section--achievements">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Achievement"
          title={
            <>
              Research-backed work with a published <span>IEEE footprint</span>
            </>
          }
          subtitle="A highlight that bridges engineering theory with practical product execution."
        />

        <motion.a
          className="achievement-banner"
          href={achievement.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="achievement-banner__icon">
            <FaFlask />
          </div>
          <div className="achievement-banner__content">
            <p className="achievement-banner__eyebrow">IEEE Xplore Publication</p>
            <h3>{achievement.title}</h3>
            <p>{achievement.summary}</p>
          </div>
          <div className="achievement-banner__tail">
            <span>Read on IEEE Xplore</span>
            <FaArrowRight />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
