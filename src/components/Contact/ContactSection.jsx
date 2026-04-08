import React, { useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

const ContactLink = ({ icon: Icon, label, value, url }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noreferrer"
    className="group flex items-center space-x-4 p-4 hover:bg-white/5 rounded-xl transition-all duration-300"
  >
    <div className="w-10 h-10 rounded-lg bg-bg-card border border-white/5 flex items-center justify-center text-white/40 group-hover:text-neon-cyan group-hover:border-neon-cyan/30 transition-colors">
      <Icon />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase text-white/30 tracking-widest">{label}</span>
      <span className="text-white/80 group-hover:text-white transition-colors">{value}</span>
    </div>
  </a>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs.send(
      "service_5rzlekg",
      "template_sjlowzo",
      formData,
      "VE82rDWI2NKcKIQpY"
    ).then(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }).catch(() => {
      setIsSending(false);
      alert("Failed to send. Please try again.");
    });
  };

  return (
    <section id="contact" className="section-full bg-bg-deep py-40">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Left: Terminal Style Links */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white uppercase mb-12 flex items-center gap-4">
            <FaTerminal className="text-neon-pink" /> 
            Connect <span className="text-white/20">/</span> Dev
          </h2>
          
          <div className="space-y-4">
            <ContactLink 
              icon={FaGithub} 
              label="Source Control" 
              value="github.com/vijayakanthang" 
              url="https://github.com/vijayakanthang"
            />
            <ContactLink 
              icon={FaLinkedin} 
              label="Professional" 
              value="linkedin.com/in/vijayakanthang" 
              url="https://linkedin.com/in/vijayakanthang"
            />
            <ContactLink 
              icon={SiLeetcode} 
              label="Algorithms" 
              value="leetcode.com/vijayakanthang" 
              url="https://leetcode.com/u/vijayakanthang/"
            />
            <ContactLink 
              icon={FaTerminal} 
              label="Electronic Mail" 
              value="vijayakanthang@gmail.com" 
              url="mailto:vijayakanthang@gmail.com"
            />
          </div>

          <div className="mt-20 p-6 glass-card rounded-2xl border-l-4 border-neon-cyan">
             <p className="text-white/60 italic text-sm">
               "Building bridges between hardware logic and digital aesthetics."
             </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="relative">
          <div className="glass-card p-10 rounded-3xl relative z-10 border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-white/40 tracking-widest px-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white focus:border-neon-cyan focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-white/40 tracking-widest px-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white focus:border-neon-cyan focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase text-white/40 tracking-widest px-2">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white focus:border-neon-cyan focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase text-white/40 tracking-widest px-2">Message</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white focus:border-neon-cyan focus:outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className={`w-full py-6 px-8 rounded-xl font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500 overflow-hidden relative group
                  ${isSent ? 'bg-neon-lime text-black' : 'bg-white text-black hover:bg-neon-cyan'}`}
              >
                <span className="relative z-10">
                  {isSending ? 'Sending Transmission...' : isSent ? 'Message Received' : 'Submit Transmission'}
                </span>
                {isSending && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
              </button>
            </form>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan/5 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-pink/5 rounded-full blur-[80px]"></div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
