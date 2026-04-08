import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useScrollScene } from '../../hooks/useScrollScene';

const SceneDrawFree = () => {
  const pathRef = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(pathRef.current, 
      { strokeDashoffset: 1000 }, 
      { 
        strokeDashoffset: 0, 
        scrollTrigger: {
          trigger: pathRef.current,
          start: 'top 50%',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, { scope: pathRef });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
      <h3 className="text-neon-cyan mb-8 uppercase tracking-widest text-xs">01 / Draw Free</h3>
      <div className="relative w-full max-w-[280px] aspect-square">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <path 
            ref={pathRef}
            d="M100,100 C150,50 180,120 100,180 C20,120 50,50 100,100 M100,100 C120,80 140,110 100,140 C60,110 80,80 100,100" 
            fill="none" 
            stroke="var(--neon-cyan)" 
            strokeWidth="0.5" 
            strokeDasharray="1000"
          />
        </svg>
      </div>
      <p className="mt-8 text-text-secondary text-[10px] max-w-[200px] text-center uppercase tracking-wider">
        A gesture-based drawing application with real-time multiplayer sync.
      </p>
    </div>
  );
};

const SceneStrings = () => {
  const phoneRef = useRef(null);
  const msgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: phoneRef.current,
        start: 'top 50%',
        end: 'bottom top',
        scrub: true,
      }
    });
    tl.to(phoneRef.current, { scale: 1.1, rotation: 5, duration: 1 });
    tl.from(msgRef.current, { y: 20, opacity: 0, duration: 0.5 }, '<0.5');
  }, { scope: phoneRef });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
      <h3 className="text-neon-pink mb-8 uppercase tracking-widest text-xs">02 / Strings</h3>
      <div ref={phoneRef} className="w-48 h-[340px] glass-card rounded-[2.5rem] border-4 border-white/10 p-4 pt-12 relative overflow-hidden">
        <div className="w-1/3 h-1 bg-white/10 rounded-full mx-auto mb-6"></div>
        <div ref={msgRef} className="space-y-4 mt-6">
          <div className="bg-neon-pink/20 p-3 rounded-2xl text-[7px] text-white self-end ml-4">Unlock the rhythm of global messages.</div>
          <div className="bg-white/5 p-3 rounded-2xl text-[7px] text-text-secondary self-start mr-4">Secure, fast, and creative.</div>
        </div>
      </div>
      <p className="mt-12 text-text-secondary text-[10px] max-w-[200px] text-center uppercase tracking-wider">
        End-to-end encrypted messaging platform with thematic UI.
      </p>
    </div>
  );
};

const SceneInventory = () => {
  const barsRef = useRef([]);

  useGSAP(() => {
    gsap.from(barsRef.current, {
      height: 0,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: {
        trigger: barsRef.current[0],
        start: 'top 80%',
        scrub: true,
      }
    });
  }, { scope: barsRef });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
      <h3 className="text-neon-lime mb-8 uppercase tracking-widest text-xs">03 / Inventory</h3>
      <div className="flex items-end gap-2 h-32">
        {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
          <div 
            key={i} 
            ref={el => barsRef.current[i] = el}
            style={{ height: `${h}%` }}
            className="w-4 md:w-6 bg-gradient-to-t from-neon-lime to-transparent rounded-t-sm"
          ></div>
        ))}
      </div>
      <p className="mt-12 text-text-secondary text-[10px] max-w-[200px] text-center uppercase tracking-wider">
        Real-time inventory management with predictive analytics.
      </p>
    </div>
  );
};

const SceneToilet = () => {
  const sensorRef = useRef(null);

  useGSAP(() => {
    gsap.to(sensorRef.current, {
      scale: 1.5,
      opacity: 0,
      repeat: -1,
      duration: 2,
      ease: 'power2.out'
    });
  }, { scope: sensorRef });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
      <h3 className="text-neon-violet mb-8 uppercase tracking-widest text-xs">04 / Smart Sanitizing</h3>
      <div className="relative">
        <div className="w-24 h-24 rounded-full border border-neon-violet/30 flex items-center justify-center">
          <div ref={sensorRef} className="absolute inset-0 rounded-full border-2 border-neon-violet"></div>
          <div className="w-3 h-3 bg-neon-violet rounded-full blur-[2px]"></div>
        </div>
      </div>
      <p className="mt-12 text-text-secondary text-[10px] max-w-[200px] text-center uppercase tracking-wider">
        IoT-based sanitation system using IR sensors and automation.
      </p>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);

  useScrollScene({
    trigger: containerRef,
    start: 'top top',
    end: '+=600%',
    pin: true,
  });

  return (
    <section ref={containerRef} id="projects" className="bg-bg-deep">
      <div className="h-screen w-full sticky top-0 flex flex-col justify-center overflow-hidden">
        <div className="container-wide h-full pt-20">
          <div className="h-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 divide-x divide-white/5 px-4">
            <SceneDrawFree />
            <SceneStrings />
            <SceneInventory />
            <SceneToilet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
