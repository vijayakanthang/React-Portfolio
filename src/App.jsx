import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MatrixRain from "./components/MatrixRain";
import Experience from "./components/Experience";
import SceneNav from "./components/dom/SceneNav";
import Sections from "./components/dom/Sections";
import Loader from "./components/Loader";
import LiteToggle from "./components/dom/LiteToggle";
import ScrollBar from "./components/dom/ScrollBar";
import { useActiveSection, useSmoothScroll } from "./hooks/useLenis";
import { useIsMobile, usePrefersReducedMotion } from "./hooks/useMediaQuery";
import { useStore } from "./lib/store";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const setReady = useStore((s) => s.setReady);
  const [booted, setBooted] = useState(false);

  useSmoothScroll(!reduced);
  useActiveSection();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* a11y: jump straight to content, bypassing the 3D */}
      <a href="#about" className="skip-link">Skip to content</a>

      <MatrixRain />
      {/* mobile is 2D-first: the rain + DOM sections carry the whole experience */}
      {!isMobile && <Experience />}

      <ScrollBar />
      <SceneNav />
      <LiteToggle />

      <main>
        <Sections />
      </main>

      <AnimatePresence>
        {!booted && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
          >
            <Loader
              onDone={() => {
                setReady(true);
                setBooted(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
