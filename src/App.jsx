import { Suspense, lazy } from "react";
import SiteNavigation from "./components/SiteNavigation";
import BackToTopButton from "./components/BackToTopButton";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import HeroSection from "./pages/HeroSection";
import useMagnetic from "./hooks/useMagnetic";
import "./styles/App.css";

const AboutSection = lazy(() => import("./pages/AboutSection"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ProjectsSection = lazy(() => import("./pages/ProjectsSection"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const LeetcodeSection = lazy(() => import("./pages/LeetcodeSection"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const AchievementPage = lazy(() => import("./pages/AchievementPage"));
const ContactSection = lazy(() => import("./pages/ContactSection"));

function App() {
  useMagnetic();

  return (
    <div className="app-shell">
      <CustomCursor />
      <NoiseOverlay />
      <SiteNavigation />
      <main className="app-main">
        <HeroSection />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <AboutSection />
          <ExperiencePage />
          <ProjectsSection />
          <SkillsPage />
          <LeetcodeSection />
          <CertificationsPage />
          <AchievementPage />
          <ContactSection />
        </Suspense>
      </main>
      <BackToTopButton />
    </div>
  );
}

export default App;
