import { useState } from "react";
import { achievement, certifications, codingProfile } from "../data/siteContent";
import useTradingCard from "../hooks/useTradingCard";

function CertArt({ title }) {
  if (title.includes("React Basics")) return <div className="art-atom" />;
  if (title.includes("Django")) return <div className="art-diamond" />;
  if (title.includes("Android")) return <div className="art-hex" />;
  return <div className="art-layer" />;
}

function TradingCard({ cert, legendary = false }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className={`trading-card ${legendary ? "is-legendary" : ""} ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped((s) => !s)}>
      <div className="trading-card__inner">
        <div className="trading-face trading-face--front">
          <div className="trading-art">{legendary ? <div className="legendary-core" /> : <CertArt title={cert.title} />}</div>
          <div className="trading-meta">
            <p className="mono trading-issuer">{cert.issuer || "META"}</p>
            <h3>{cert.title}</h3>
            <p className="mono">{cert.platform || "COURSERA"}</p>
            {cert.credentialId ? <p className="mono tiny">ID: {cert.credentialId}</p> : null}
          </div>
        </div>

        <div className="trading-face trading-face--back">
          <h4>VERIFY</h4>
          <div className="qr-placeholder" />
          {cert.url ? <a href={cert.url} target="_blank" rel="noreferrer">Open Verify URL</a> : null}
          <p className="mono">Authentic Certificate</p>
        </div>
      </div>
    </article>
  );
}

export default function CertificationsPage() {
  useTradingCard(".trading-card", window.innerWidth < 900);

  const legendary = {
    title: "PUBLISHED RESEARCH",
    issuer: "IEEE XPLORE",
    platform: "FIRST EDITION",
    url: achievement.url,
  };

  return (
    <section id="certifications" className="page-section section certs-v3">
      <div className="section-shell">
        <p className="section-eyebrow mono">CERTS + LEETCODE</p>
        <h2 className="section-title">Holographic trading cards.</h2>

        <div className="trading-grid">
          {certifications.map((cert) => <TradingCard key={cert.title} cert={cert} />)}
        </div>

        <div className="trading-grid trading-grid--featured">
          <TradingCard cert={legendary} legendary />
          <article className="trading-card skill-card">
            <div className="trading-face trading-face--front">
              <h3>LEETCODE</h3>
              <p className="mono">@{codingProfile.username}</p>
              <div className="power-bars">
                <span style={{ width: "78%" }} /><span style={{ width: "62%" }} /><span style={{ width: "41%" }} />
              </div>
              <p>Focus: DSA, Java, Python</p>
              <a href={codingProfile.url} target="_blank" rel="noreferrer">View Profile ?</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
