import SiteNavigation from "./components/SiteNavigation";
import BackToTopButton from "./components/BackToTopButton";
import HeroSection from "./pages/HeroSection";
import AboutSection from "./pages/AboutSection";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsSection from "./pages/ProjectsSection";
import SkillsPage from "./pages/SkillsPage";
import CertificationsPage from "./pages/CertificationsPage";
import AchievementPage from "./pages/AchievementPage";
import ContactSection from "./pages/ContactSection";
import "./styles/App.css";

function App() {
  return (
    <div className="app-shell">
      <SiteNavigation />
      <main className="app-main">
        <HeroSection />
        <AboutSection />
        <ExperiencePage />
        <ProjectsSection />
        <SkillsPage />
        <CertificationsPage />
        <AchievementPage />
        <ContactSection />
      </main>
      <BackToTopButton />
    </div>
  );
}

export default App;
