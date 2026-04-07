import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/siteContent";

export default function AboutSection() {
  return (
    <section id="about" className="page-section section section--about">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Product-minded engineering with an eye on <span>speed and polish</span>
            </>
          }
          subtitle="A short profile, quick proof points, and the academic foundation behind the work."
        />

        <div className="about-grid">
          <motion.article
            className="glass-card about-story"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-story__copy">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="about-story__details">
              <div>
                <span className="detail-label">Location</span>
                <span>{profile.location}</span>
              </div>
              <div>
                <span className="detail-label">Email</span>
                <span>{profile.email}</span>
              </div>
              <div>
                <span className="detail-label">Current focus</span>
                <span>Next.js performance, SEO, and premium frontend UX</span>
              </div>
            </div>

            <a
              className="inline-link"
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              View current live portfolio
              <FaArrowRight />
            </a>
          </motion.article>

          <motion.aside
            className="glass-card about-education"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <p className="card-label">Education</p>
            <h3>{profile.education.degree}</h3>
            <p>{profile.education.school}</p>
            <p className="muted">{profile.education.meta}</p>
          </motion.aside>
        </div>

        <div className="quick-stats-grid">
          {profile.quickStats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="quick-stat-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="quick-stat-card__value">{stat.value}</span>
              <span className="quick-stat-card__label">{stat.label}</span>
              <p>{stat.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
