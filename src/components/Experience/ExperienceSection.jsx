import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useScrollScene } from '../../hooks/useScrollScene';

const experiences = [
  {
    company: "Klamp.ai",
    role: "FullStack Developer Intern",
    period: "Feb 2024 - Jul 2024",
    description: [
      "Built landing pages with MERN stack.",
      "Optimized web speed and SEO.",
      "Collaborated on collaborative whiteboard features."
    ],
    tech: ["React", "Node", "Express", "MongoDB", "GSAP"]
  },
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    period: "Jul 2024 - Present",
    description: [
      "Developing enterprise solutions.",
      "Enhancing frontend performance.",
      "Agile team coordination."
    ],
    tech: ["Java", "Spring Boot", "React", "SQL"]
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  useScrollScene({
    trigger: sectionRef,
    start: 'top top',
    end: '+=400%',
    pin: true,
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
      }
    });

    // Animate connector line
    tl.fromTo(lineRef.current, 
      { strokeDashoffset: 1000 }, 
      { strokeDashoffset: 0, duration: 1 }, 0
    );

    // Horizontal slide and zoom
    experiences.forEach((_, i) => {
      const card = cardsRef.current[i];
      const nextCard = cardsRef.current[i+1];

      // Initial card highlight and zoom
      if (i === 0) {
        tl.to(card, { scale: 1.1, opacity: 1, duration: 0.5 }, 0);
      }

      // Transition between cards
      if (nextCard) {
        tl.to(containerRef.current, { x: `-${(i+1) * 100}vw`, duration: 1 });
        tl.to(card, { scale: 0.8, opacity: 0.2, zIndex: 0, duration: 0.5 }, '>');
        tl.to(nextCard, { scale: 1.1, opacity: 1, zIndex: 10, duration: 0.5 }, '<');
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" className="section-full h-screen bg-bg-deep overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 overflow-hidden z-0 pointer-events-none">
        <svg width="100%" height="2" className="absolute top-0 left-0">
          <line ref={lineRef} x1="0" y1="1" x2="100%" y2="1" stroke="var(--neon-cyan)" strokeWidth="2" strokeDasharray="1000" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <h2 className="mb-12 text-white/20 uppercase tracking-widest text-center select-none">Experience</h2>
        
        <div ref={containerRef} className="flex gap-20 items-center justify-center pt-20">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              ref={el => cardsRef.current[i] = el}
              className="flex-shrink-0 w-[80vw] md:w-[600px] glass-card p-8 md:p-12 rounded-3xl relative transition-all duration-500 opacity-50 scale-90"
            >
              <span className="text-neon-cyan/50 text-6xl font-bold absolute -top-10 -left-6 select-none leading-none opacity-20">0{i+1}</span>
              <div className="mb-8">
                <h3 className="text-4xl font-bold text-white mb-2">{exp.company}</h3>
                <p className="text-neon-violet font-medium uppercase tracking-widest text-sm">{exp.role}</p>
                <p className="text-text-secondary text-xs mt-2">{exp.period}</p>
              </div>

              <div className="space-y-4 mb-10">
                {exp.description.map((point, idx) => (
                  <p key={idx} className="text-text-primary/80 leading-relaxed pl-4 border-l border-white/10 text-xs tracking-normal">
                    {point}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 lowercase">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
