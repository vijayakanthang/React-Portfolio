import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import GithubWidget from "../components/GithubWidget";
import SectionHeader from "../components/SectionHeader";
import { contactCommands, profile } from "../data/siteContent";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
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
    } catch (error) {
      setStatus("error");
    }
  };

  const statusMessage = {
    idle: "$ ready_to_send.sh",
    sending: "$ sending_message.sh ...",
    success: "[ok] Message sent. I will reply soon.",
    error: "[error] Message delivery failed. Reach me directly by email.",
  }[status];

  return (
    <section id="contact" className="page-section section section--contact">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Reach out through a developer-native footer with a live <span>GitHub pulse</span>
            </>
          }
          subtitle="Part activity feed, part terminal prompt, and fully usable on mobile."
        />

        <div className="contact-layout">
          <motion.div
            className="contact-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <GithubWidget username={profile.githubUsername} />
          </motion.div>

          <motion.div
            className="contact-panel terminal-contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className="terminal-window__header terminal-window__header--contact">
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="terminal-window__title">contact@vijayakanthan:~</span>
            </div>

            <form className="terminal-form" onSubmit={handleSubmit}>
              <label>
                <span>&gt; enter_name:</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>&gt; enter_email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                <span>&gt; enter_message:</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role, product, or idea."
                  required
                />
              </label>

              <button type="submit" className="button button--primary">
                $ send_message.sh
              </button>

              <p className={`terminal-status terminal-status--${status}`}>{statusMessage}</p>
            </form>

            <div className="terminal-links">
              {contactCommands.map((command) => (
                <a key={command.label} href={command.href} target="_blank" rel="noreferrer">
                  <span>{command.label}</span>
                  <span>{command.value}</span>
                </a>
              ))}
            </div>

            <div className="contact-direct">
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <p>{profile.location}</p>
            </div>
          </motion.div>
        </div>

        <footer className="footer-note">
          <span>{profile.name}</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
