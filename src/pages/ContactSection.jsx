import { useMemo, useState } from "react";
import emailjs from "emailjs-com";
import GithubWidget from "../components/GithubWidget";
import RadarPing from "../components/RadarPing";
import { contactCommands, profile } from "../data/siteContent";

const initialFormState = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [burst, setBurst] = useState(false);
  const [pulseBoost, setPulseBoost] = useState(1);

  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => i), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        "service_5rzlekg",
        "template_sjlowzo",
        {
          name: formData.name,
          email: formData.email,
          subject: `Portfolio contact from ${formData.name}`,
          message: formData.message,
        },
        "VE82rDWI2NKcKIQpY",
      );
      setFormData(initialFormState);
      setStatus("success");
      setBurst(true);
      setPulseBoost(2);
      window.setTimeout(() => setBurst(false), 900);
      window.setTimeout(() => setPulseBoost(1), 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="page-section section contact-v3">
      <RadarPing pulseBoost={pulseBoost} />
      <div className="section-shell contact-v3__shell">
        <div className="contact-v3__left">
          <p className="section-eyebrow mono">TRANSMIT A SIGNAL</p>
          <h2>LET&apos;S TALK</h2>
          <div className="signal-readouts">
            {contactCommands.map((command) => (
              <a key={command.label} href={command.href} target="_blank" rel="noreferrer">
                <span className="readout-dot" />
                <span className="mono">{command.label.replace("$ ", "").toUpperCase()}</span>
                <span>{command.value}</span>
              </a>
            ))}
          </div>
          <GithubWidget username={profile.githubUsername} />
        </div>

        <div className={`contact-v3__right ${status === "success" ? "is-sent" : ""}`}>
          <form className="signal-form" onSubmit={handleSubmit}>
            <label><span className="signal-label">NAME</span><input className="signal-input" name="name" value={formData.name} onChange={handleChange} required /></label>
            <label><span className="signal-label">EMAIL</span><input className="signal-input" type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
            <label><span className="signal-label">MESSAGE</span><textarea className="signal-input" rows="5" name="message" value={formData.message} onChange={handleChange} required /></label>

            <button type="submit" className="button transmit-btn button--primary">
              {status === "success" ? "TRANSMITTED" : "TRANSMIT ->"}
            </button>
            <p className={`terminal-status mono terminal-status--${status}`}>{status === "error" ? "Signal failed. Please retry." : status === "sending" ? "Transmitting..." : "Ready"}</p>
          </form>

          {burst ? (
            <div className="particle-burst" aria-hidden="true">
              {particles.map((item) => (
                <span
                  key={item}
                  style={{
                    transform: `translate(${(Math.random() - 0.5) * 180}px, ${(Math.random() - 0.5) * 140}px)`,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
