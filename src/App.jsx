import React, { Suspense, lazy } from 'react';

// Common Components
import NavigationBar from './components/NavigationBar';

// Sections (Lazy Loaded for performance)
const HeroSection = lazy(() => import('./components/Hero/HeroSection'));
const AboutSection = lazy(() => import('./components/About/AboutSection'));
const ExperienceSection = lazy(() => import('./components/Experience/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/Projects/ProjectShowcase'));
const SkillsSection = lazy(() => import('./components/Skills/SkillsSection'));
const LeetCodeSection = lazy(() => import('./components/LeetCode/LeetCodeSection'));
const IEEEBanner = lazy(() => import('./components/Achievement/IEEEBanner'));
const ContactSection = lazy(() => import('./components/Contact/ContactSection'));

function App() {
  return (
    <main className="bg-bg-deep text-text-primary selection:bg-neon-cyan selection:text-black">
      <NavigationBar />
      
      <Suspense fallback={<div className="h-screen bg-bg-deep" />}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <LeetCodeSection />
        <IEEEBanner />
        <ContactSection />
      </Suspense>

      <footer className="py-12 bg-bg-deep text-center border-t border-white/5">
        <p className="text-[10px] uppercase text-white/20 tracking-widest px-4">
          Built with React + GSAP + Three.js + Tailwind CSS. Designed with Apple-style aesthetics.
          <br />&copy; 2024 Vijayakanthan G. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}

export default App;