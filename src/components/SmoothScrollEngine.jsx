import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollEngine() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
      smoothTouch: false,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

