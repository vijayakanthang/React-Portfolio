import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import "../styles/ContactPage.css";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",    // added subject here
    message: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_5rzlekg",
        "template_sjlowzo",
        formData,   // formData now includes subject
        "VE82rDWI2NKcKIQpY"
      )
      .then(
        () => alert("Message sent successfully!"),
        (error) => alert("Failed to send message: " + error.text)
      );
  };

  return (
    <section id="contact">
      <div className="contact-wrapper">

        {/* Left Side */}
        <div className="contact-info-panel">
          <h1>
            Let’s <span className="highlight">Talk</span> <br /> About Your Ideas
          </h1>
          <p>Whether you have a question or just want to say hi, I’ll try my best to get back to you!</p>
          <div className="social-links">
            <a href="https://github.com/vijayakanthang" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com/in/vijayakanthan-g" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://vijayakanthan-protfolio.vercel.app/" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form-panel">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"        // added subject input
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
}
