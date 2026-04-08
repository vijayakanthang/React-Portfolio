import React from 'react';

const IEEEBanner = () => {
  return (
    <section className="relative overflow-hidden bg-[#0c0c12] py-32 border-y border-white/5">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}></div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)',
        backgroundSize: '200px 200px',
      }}></div>

      <div className="container-wide relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-bold uppercase tracking-widest mb-6">
            IEEE Publication
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Design of Smart Sanitizing Toilet System using IoT and Sensors
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            An innovative research publication detailing a system that leverages IR sensors and automated 
            sterilization mechanisms to enhance hygiene and sanitation through IoT-integrated feedback loops.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase">Publication Date</span>
              <span className="text-white font-mono text-sm tracking-widest">March 2024</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 mx-4"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase">Venue</span>
              <span className="text-white font-mono text-sm tracking-widest">IEEE Xplore Digital</span>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-4 bg-neon-cyan/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <button 
            className="relative px-16 py-6 rounded-2xl bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:tracking-[0.4em] transition-all duration-500 shadow-2xl"
          >
            Read Publication
          </button>
        </div>
      </div>
      
      {/* Aesthetic corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-neon-cyan/20 m-12 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-neon-pink/20 m-12 opacity-30"></div>
    </section>
  );
};

export default IEEEBanner;
