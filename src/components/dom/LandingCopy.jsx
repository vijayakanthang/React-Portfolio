import { useEffect, useRef } from "react";
import { useStore } from "../../lib/store";
import { smoothstep } from "../../lib/sections";

/** Hero overlay for the Landing scene. Fades on the first bit of scroll. */
export default function LandingCopy() {
  const ref = useRef(null);

  useEffect(() => {
    const apply = (p) => {
      const o = 1 - smoothstep(0.03, 0.12, p);
      const el = ref.current;
      if (!el) return;
      el.style.opacity = o;
      el.style.transform = `translateY(${-p * 80}px)`;
      el.style.pointerEvents = o < 0.1 ? "none" : "auto";
    };
    apply(useStore.getState().scrollProgress);
    return useStore.subscribe((s) => apply(s.scrollProgress));
  }, []);

  return (
    <div ref={ref} className="landing-copy">
      <p className="kicker">WELCOME TO</p>
      <h1 className="hero-title">MY WORLD</h1>
      <p className="hero-sub">SCROLL TO BEGIN</p>
      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse">
          <span className="wheel" />
        </span>
      </div>
    </div>
  );
}
