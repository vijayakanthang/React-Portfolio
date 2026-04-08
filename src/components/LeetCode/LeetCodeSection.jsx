import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProgressRing = ({ percentage, color, label, count }) => {
  const ringRef = useRef(null);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useGSAP(() => {
    gsap.fromTo(ringRef.current, 
      { strokeDashoffset: circumference }, 
      { 
        strokeDashoffset: offset, 
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ringRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: ringRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" className="rotate-[-90deg]">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle 
            ref={ringRef}
            cx="64" cy="64" r={radius} fill="none" stroke={color} 
            strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{count}</span>
          <span className="text-[8px] uppercase tracking-tighter text-white/40">{label}</span>
        </div>
      </div>
      <span className="text-[10px] text-white/60 font-mono tracking-widest">{percentage}%</span>
    </div>
  );
};

const LeetCodeSection = () => {
  const [stats, setStats] = useState({
    totalSolved: 156,
    easySolved: 82,
    mediumSolved: 64,
    hardSolved: 10,
    totalQuestions: 3000,
  });

  useEffect(() => {
    fetch('https://leetcode-stats-api.herokuapp.com/vijayakanthang')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStats(data);
        }
      })
      .catch(() => console.log('Using fallback LeetCode stats'));
  }, []);

  const totalPossible = stats.totalQuestions || 3000;

  return (
    <section id="leetcode" className="section-full bg-bg-deep border-t border-white/5 py-40">
      <div className="container-wide">
        <div className="glass-card p-12 rounded-3xl border border-white/10 flex flex-col items-center text-center">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet mb-4 uppercase tracking-[0.5em] text-sm">
            DSA Performance
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Coding Proficiency</h3>
          <p className="text-text-secondary text-sm max-w-lg mb-16">
            Solving algorithmic challenges to sharpen logic and computational efficiency.
            Total problems solved across different difficulty tiers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
            <ProgressRing 
              percentage={Math.round((stats.easySolved / stats.totalSolved) * 100)} 
              color="#00f0ff" 
              label="Easy" 
              count={stats.easySolved} 
            />
            <ProgressRing 
              percentage={Math.round((stats.mediumSolved / stats.totalSolved) * 100)} 
              color="#ffb400" 
              label="Medium" 
              count={stats.mediumSolved} 
            />
            <ProgressRing 
              percentage={Math.round((stats.hardSolved / stats.totalSolved) * 100)} 
              color="#ff2d78" 
              label="Hard" 
              count={stats.hardSolved} 
            />
          </div>

          <div className="w-full max-w-sm mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="text-left relative z-10">
              <span className="text-[10px] uppercase text-white/40 block">Global Standing</span>
              <span className="text-white font-mono text-xl">Top 12%</span>
            </div>
            <a 
              href="https://leetcode.com/u/vijayakanthang/" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all relative z-10"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeSection;
