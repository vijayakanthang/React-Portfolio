import React, { useRef, Suspense, lazy } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

// Lazy load canvas to save resources
const HeroCanvas = lazy(() => import('./HeroCanvas'));

const HeroSection = () => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const terminalRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      }
    });

    // Expand letter spacing on name
    tl.fromTo(nameRef.current, 
      { letterSpacing: '0.1em' }, 
      { letterSpacing: '1.5em', opacity: 0, duration: 1 }
    );

    // Fade out other content
    tl.to(contentRef.current, { opacity: 0, y: -100, duration: 0.5 }, 0);
    
    // Scale terminal
    tl.to(terminalRef.current, { scale: 0.8, opacity: 0, duration: 0.5 }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-full h-screen relative overflow-hidden bg-bg-deep">
      <Suspense fallback={<div className="absolute inset-0 bg-bg-deep" />}>
        <HeroCanvas />
      </Suspense>

      <div ref={contentRef} className="container-wide relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-medium backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          <span>Available for work</span>
        </div>

        <h1 ref={nameRef} className="font-bold text-white mb-2 select-none uppercase">
          Vijayakanthan G
        </h1>

        <div className="h-10 text-xl md:text-2xl text-neon-violet font-medium">
          <Typewriter
            options={{
              strings: ['Creative Developer', 'Full Stack Engineer', 'MERN Specialist'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <div ref={terminalRef} className="mt-12 glass-card rounded-xl p-6 w-full max-w-2xl text-left font-mono text-sm leading-relaxed relative overflow-hidden shadow-2xl">
          <div className="flex space-x-2 mb-4 border-b border-white/5 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="ml-2 text-white/30 text-xs lowercase">portfolio.sh</span>
          </div>
          <p className="text-neon-cyan"><span className="text-white/40">$</span> whoami</p>
          <p className="text-white/80 mt-1">
            Passionate Creative Developer building cinematic web experiences.
            Specialized in GSAP, Three.js, and React.
          </p>
          <p className="text-neon-pink mt-4"><span className="text-white/40">$</span> ls skills</p>
          <p className="text-white/80 mt-1">
            React, Node.js, Three.js, GSAP, MongoDB, TailwindCSS...
          </p>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => window.open("https://flowcv.com/resume/3l36i0wbrb", "_blank")}
            className="group relative px-6 py-2.5 rounded-md bg-white text-black font-semibold overflow-hidden transition-all duration-300 hover:tracking-widest"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide text-[10px]">
              Resume <FaDownload />
            </span>
          </button>
          
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="group px-6 py-2.5 rounded-md border border-white/20 bg-transparent text-white font-semibold flex items-center gap-2 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="uppercase tracking-wide text-[10px]">Contact</span> <MdContactMail className="text-neon-violet" />
          </button>
        </div>

        <div className="mt-6 flex gap-6 text-xl text-white/30">
          <a href="https://linkedin.com/in/vijayakanthang/" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://github.com/vijayakanthang" target="_blank" rel="noreferrer" className="hover:text-neon-pink transition-colors">
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
