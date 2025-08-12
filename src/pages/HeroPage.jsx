import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import "../styles/HeroPage.css";
import FloatingIcons from '../components/FloatingIcons';

function HeroPage() {
  return (
    <div id="hero-page">
      <div className="animated-bg"></div> {/* Animated background */}
      <FloatingIcons />

      <motion.div
        className='hero'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.p
          className='text1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Hello I'm
        </motion.p>

        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          VijayaKanthan G
        </motion.h1>

        <motion.span
          className='text2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
            <Typewriter
              options={{
                strings: ['FullStack Developer', 'Electrical and Electronics Engineer'],
                autoStart: true,
                loop: true,
              }}
            />
        </motion.span>

        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button
            className="btn btn-black"
            onClick={() => window.open("https://flowcv.com/resume/3l36i0wbrb", "_blank")}
          >
            Download CV <FaDownload className="icon" />
          </button>

          <button
            className="btn btn-white"
            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          >
            Contact Info <MdContactMail className="icon" />
          </button>

        </motion.div>

        <motion.div
          id="socials-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a href="https://linkedin.com/in/vijayakanthang/" target="_blank" rel="noreferrer">
            <FaLinkedin className="icon" />
          </a>
          <a href="https://github.com/vijayakanthang" target="_blank" rel="noreferrer">
            <FaGithub className="icon" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroPage;
