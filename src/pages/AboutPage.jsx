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

export default function About() {
  return (
    <section id="about">
      <div className="about-container">

        {/* Intro */}
        <div className="about-intro">
          <h2>About <span className="highlight">Me</span></h2>
          <p className="summary">
            As an engineer, I aim to apply my skills in a dynamic workplace.
            Seeking a challenging role that aligns with my background and offers
            professional growth. Eager to contribute to innovative projects in a
            forward-thinking organization.
          </p>
        </div>

        {/* Education */}
        <div className="about-education">
          <h3>Education</h3>
          <p><strong>Bachelor's in Electrical and Electronics Engineering</strong></p>
          <p>Karpagam Institute Of Technology</p>
        </div>

        {/* Skills */}
        <div className="about-skills">
          <h3>Skills</h3>
          <div className="skills-grid">
            {skillsData.skills.map((skill, idx) => {
              const Icon = iconMap[skill.name] || FaDatabase;
              return (
                <div className="skill-card" key={idx}>
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Languages */}
        <div className="about-languages">
          <h3>Languages</h3>
          <div className="skills-grid">
            {skillsData.languages.map((lang, idx) => {
              const Icon = iconMap[lang.name] || FaDatabase;
              return (
                <div className="skill-card" key={idx}>
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
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
