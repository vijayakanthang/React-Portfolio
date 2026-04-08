import React, { useEffect, useState } from "react";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-bg-deep/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
    }`}>
      <div className="container-wide flex justify-between items-center">
        <a 
          href="/" 
          className="text-white font-bold tracking-tighter text-xl uppercase select-none group"
        >
          Vijayakanthan <span className="text-neon-cyan group-hover:text-neon-pink transition-colors">G</span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-5 py-3 rounded-lg text-xs uppercase tracking-[0.1em] text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile specific icon - Apple simple style */}
        <div className="md:hidden w-6 h-6 flex flex-col justify-between items-end cursor-pointer group">
          <div className="w-6 h-[1px] bg-white group-hover:bg-neon-cyan transition-colors"></div>
          <div className="w-4 h-[1px] bg-white group-hover:bg-neon-cyan transition-colors"></div>
        </div>
      </div>
    </nav>
  );
}
