import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaJsSquare,
  FaDatabase
} from "react-icons/fa";
import { SiMongodb, SiMysql, SiDjango, SiExpress } from "react-icons/si";
import { motion } from "framer-motion";
import "../styles/AboutPage.css";

const iconMap = {
  "MongoDB": SiMongodb,
  "Express JS": SiExpress,
  "React JS": FaReact,
  "Node JS": FaNodeJs,
  "Django": SiDjango,
  "React Native": FaReact,
  "MySQL": SiMysql,
  "Python": FaPython,
  "Java": FaJava,
  "HTML": FaHtml5,
  "JavaScript": FaJsSquare
};

const skillsData = {
  skills: [
    { name: "MongoDB", level: 40 },
    { name: "Express JS", level: 50 },
    { name: "React JS", level: 70 },
    { name: "Node JS", level: 60 },
    { name: "Django", level: 40 },
    { name: "React Native", level: 70 },
    { name: "MySQL", level: 60 }
  ],
  languages: [
    { name: "Python", level: 80 },
    { name: "Java", level: 60 },
    { name: "HTML", level: 60 },
    { name: "JavaScript", level: 30 }
  ]
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export default function About() {
  return (
    <section id="about">
      <div className="about-container">

        {/* Intro */}
        <motion.div
          className="about-intro"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>About <span className="highlight">Me</span></h2>
          <p className="summary">
            As an engineer, I aim to apply my skills in a dynamic workplace.
            Seeking a challenging role that aligns with my background and offers
            professional growth. Eager to contribute to innovative projects in a
            forward-thinking organization.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="about-education"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Education</h3>
          <p><strong>Bachelor's in Electrical and Electronics Engineering</strong></p>
          <p>Karpagam Institute Of Technology</p>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="about-skills"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Skills</h3>
          <div className="skills-grid">
            {skillsData.skills.map((skill, idx) => {
              const Icon = iconMap[skill.name] || FaDatabase;
              return (
                <motion.div
                  className="skill-card"
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-name">
                    <Icon style={{ marginRight: "8px" }} />
                    {skill.name}
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-level"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          className="about-languages"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Languages</h3>
          <div className="skills-grid">
            {skillsData.languages.map((lang, idx) => {
              const Icon = iconMap[lang.name] || FaDatabase;
              return (
                <motion.div
                  className="skill-card"
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-name">
                    <Icon style={{ marginRight: "8px" }} />
                    {lang.name}
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-level"
                      style={{ width: `${lang.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
