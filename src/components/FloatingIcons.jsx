import {FaReact,FaPython,FaMicrochip,FaHtml5,FaCss3Alt,FaJsSquare,FaNodeJs,FaGitAlt} from "react-icons/fa";

import {SiMongodb,  SiDjango,} from "react-icons/si";

import "../styles/HeroPage.css";


const icons = [
  { Component: FaReact, top: "10%", left: "5%", size: "3rem" },
  { Component: FaPython, top: "30%", left: "70%", size: "2.5rem" },
  { Component: FaMicrochip, top: "60%", left: "20%", size: "2rem" },
  { Component: SiMongodb, top: "80%", left: "80%", size: "3rem" },
  { Component: SiDjango, top: "50%", left: "50%", size: "2.5rem" },
  { Component: FaHtml5, top: "15%", left: "85%", size: "2.5rem" },
  { Component: FaCss3Alt, top: "40%", left: "10%", size: "2.5rem" },
  { Component: FaJsSquare, top: "70%", left: "40%", size: "2.5rem" },
  { Component: FaNodeJs, top: "55%", left: "75%", size: "3rem" },
  { Component: FaGitAlt, top: "35%", left: "90%", size: "2rem" },

];

export default function FloatingIcons() {
  return (
    <div className="floating-icons-container">
      {icons.map((icon, index) => {
        const Icon = icon.Component;
        return (
          <Icon
            key={index}
            className="floating-icon"
            style={{
              top: icon.top,
              left: icon.left,
              fontSize: icon.size,
              animationDelay: `${Math.random() * 8}s`, // Random start
              opacity: 0.05 + Math.random() * 0.05 // Slight variation
            }}
          />
        );
      })}
    </div>
  );
}
