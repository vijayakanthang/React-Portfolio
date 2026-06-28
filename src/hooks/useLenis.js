import { useEffect } from "react";
import Lenis from "lenis";
import { useStore } from "../lib/store";

/** Module-level singleton so any component can request a smooth scroll. */
let lenisInstance = null;

export function scrollToId(target, opts = {}) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.3, ...opts });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Jump to a scene by 0→1 fraction of the whole page. */
export function scrollToProgress(p, opts = {}) {
  const limit =
    document.documentElement.scrollHeight - window.innerHeight;
  const y = limit * Math.min(1, Math.max(0, p));
  if (lenisInstance) lenisInstance.scrollTo(y, { duration: 1.4, ...opts });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Mounts Lenis smooth-scroll while `enabled`, and continuously publishes
 * scrollProgress (0→1) to the global store. Falls back to a native scroll
 * listener (for reduced-motion users) so progress still drives the world.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    const setScrollProgress = useStore.getState().setScrollProgress;

    if (!enabled) {
      const onScroll = () => {
        const limit =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(limit > 0 ? window.scrollY / limit : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ({ progress }) => setScrollProgress(progress || 0));

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
