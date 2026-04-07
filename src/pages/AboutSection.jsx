import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import FloatingRibbon from "../components/FloatingRibbon";
import { profile } from "../data/siteContent";

function SlotNumber({ value, active }) {
  const digits = String(value).split("");
  return (
    <span className="slot-number">
      {digits.map((digit, i) => (
        <span key={`${digit}-${i}`} className={`slot-col ${active ? "is-active" : ""}`} style={{ "--target": Number(digit) }}>
          <span className="slot-strip">01234567890123456789</span>
        </span>
      ))}
    </span>
  );
}

export default function AboutSection() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const words = useMemo(() => profile.about.join(" ").split(" "), []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("about");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setProgress(p);
      if (p > 0.35) setActive(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".about-word",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.02,
        duration: 0.5,
        scrollTrigger: { trigger: "#about", start: "top 70%", end: "top 10%", scrub: 1 },
      },
    );
  }, []);

  return (
    <section id="about" className="page-section section section--about museum-about">
      <div className="about-wall" aria-hidden="true">VIJAYAKANTHAN VIJAYAKANTHAN VIJAYAKANTHAN</div>
      <FloatingRibbon progress={progress} simplified={window.innerWidth < 900} />

      <div className="section-shell museum-about__content">
        <p className="section-eyebrow mono">001 / ABOUT</p>
        <h2 className="museum-heading">Building things that feel good.</h2>

        <div className="museum-frames">
          <article className="museum-frame">
            <p className="about-word-line">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="about-word">{word}</span>
              ))}
            </p>
            <p className="museum-placard">Vijayakanthan G, Chennai</p>
          </article>

          <article className="museum-frame museum-stats-frame">
            {profile.quickStats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="museum-stat">
                <SlotNumber value={stat.value.replace(/\D/g, "") || "0"} active={active} />
                <p>{stat.label}</p>
              </div>
            ))}
          </article>
        </div>

        <article className="museum-education-card">
          <p className="card-label mono">Education Placard</p>
          <h3>{profile.education.degree}</h3>
          <p>{profile.education.school}</p>
          <p className="muted">{profile.education.meta}</p>
        </article>
      </div>
    </section>
  );
}