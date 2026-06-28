import { useEffect } from "react";
import { useStore } from "../../lib/store";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/** Lite-mode toggle. Auto-enables for mobile / reduced-motion on first load. */
export default function LiteToggle() {
  const lite = useStore((s) => s.liteMode);
  const setLite = useStore((s) => s.setLiteMode);
  const toggle = useStore((s) => s.toggleLiteMode);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || reduced) setLite(true);
  }, [isMobile, reduced, setLite]);

  return (
    <button
      type="button"
      className={`lite-toggle${lite ? " is-on" : ""}`}
      onClick={toggle}
      aria-pressed={lite}
      title="Toggle lite mode (faster, fewer effects)"
    >
      <span className="dot" /> {lite ? "LITE" : "FULL"}
    </button>
  );
}
