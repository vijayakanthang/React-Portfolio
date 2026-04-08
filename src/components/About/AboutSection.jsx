import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useScrollScene } from '../../hooks/useScrollScene';

const StatCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useGSAP(() => {
    gsap.to(countRef.current, {
      innerText: end,
      duration: duration,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: countRef.current,
        start: 'top 80%',
      },
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].innerText));
      }
    });
  }, { scope: countRef });

  return (
    <div className="flex flex-col items-center">
      <span ref={countRef} className="text-4xl md:text-6xl font-bold text-neon-cyan">
        0
      </span>
      <span className="text-xs uppercase tracking-widest text-text-secondary mt-2">
        {suffix}
      </span>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const eduRef = useRef(null);

  // Setup pinned scene
  useScrollScene({
    trigger: sectionRef,
    start: 'top top',
    end: '+=150%',
    pin: true,
  });

  useGSAP(() => {
    // Heading letter spacing expansion
    gsap.fromTo(headingRef.current, 
      { letterSpacing: '0em', opacity: 0.2 },
      { 
        letterSpacing: '0.5em', 
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'top -50%',
          scrub: true,
        }
      }
    );

    // Bio word-by-word reveal
    const words = bioRef.current.querySelectorAll('.word');
    gsap.from(words, {
      opacity: 0.1,
      y: 10,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: {
        trigger: bioRef.current,
        start: 'top 60%',
        end: 'top 20%',
        scrub: true,
      }
    });

    // Education card slide in
    gsap.from(eduRef.current, {
      x: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: eduRef.current,
        start: 'top 90%',
        end: 'top 70%',
        scrub: true,
      }
    });
  }, { scope: sectionRef });

  const bioText = "I am a creative developer with a background in Electrical and Electronics Engineering. I bridge the gap between complex engineering logic and immersive visual storytelling. My goal is to build digital experiences that are not only functional but evoke emotion through smooth motion and interactive design.";

  return (
    <section ref={sectionRef} id="about" className="section-full bg-bg-deep overflow-hidden py-32">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 ref={headingRef} className="text-white uppercase mb-12">
            About <span className="text-neon-pink">Me</span>
          </h2>
          
          <p ref={bioRef} className="text-xl md:text-2xl text-text-primary leading-relaxed">
            {bioText.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                <span className="word inline-block">{word}</span>
                {' '}
              </React.Fragment>
            ))}
          </p>

          <div className="mt-16 grid grid-cols-3 gap-8">
            <StatCounter end={2} suffix="Years Experience" />
            <StatCounter end={15} suffix="Projects Built" />
            <StatCounter end={500} suffix="GitHub Commits" />
          </div>
        </div>

        <div className="relative">
          <div ref={eduRef} className="glass-card p-8 rounded-2xl relative z-10">
            <h3 className="text-neon-violet mb-4 uppercase tracking-widest text-sm">Education</h3>
            <h4 className="text-xl text-white">B.E. Electrical & Electronics</h4>
            <p className="text-text-secondary mt-2">Karpagam Institute Of Technology</p>
            <div className="mt-6 flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/50 uppercase border border-white/10">Engineering</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/50 uppercase border border-white/10">Tech Enthusiast</span>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-pink/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
