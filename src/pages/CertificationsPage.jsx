import { motion } from "framer-motion";
import { FaArrowRight, FaCertificate } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import SectionHeader from "../components/SectionHeader";
import { certifications, codingProfile } from "../data/siteContent";

export default function CertificationsPage() {
  return (
    <section id="certifications" className="page-section section section--certifications">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Certifications"
          title={
            <>
              Credentials that reinforce the stack behind the <span>builds</span>
            </>
          }
          subtitle="Short, focused certifications that support day-to-day engineering work."
        />

        <div className="certification-grid">
          {certifications.map((item, index) => (
            <motion.article
              key={item.title}
              className="certification-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="certification-card__icon">
                <FaCertificate />
              </div>
              <div>
                <p className="certification-card__meta">
                  {item.issuer} | {item.platform}
                </p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="certification-card__footer">
                  <span className="credential-id">ID: {item.credentialId}</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className="inline-link">
                    Verify certificate
                    <FaArrowRight />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="coding-profile-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: certifications.length * 0.08 }}
          >
            <div className="coding-profile-card__icon">
              <SiLeetcode />
            </div>
            <div className="coding-profile-card__content">
              <p className="certification-card__meta">{codingProfile.platform} | Coding Profile</p>
              <h3>@{codingProfile.username}</h3>
              <p>{codingProfile.summary}</p>
              <div className="coding-profile-card__chips">
                {codingProfile.focus.map((item) => (
                  <span key={item} className="project-tech-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <a href={codingProfile.url} target="_blank" rel="noreferrer" className="button button--ghost">
              View Profile
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
