import { useEffect } from "react";
import gsap from "gsap";

const MAGNETIC_SELECTOR = "button, a";

export default function useMagnetic() {
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return undefined;

    const targets = Array.from(document.querySelectorAll(MAGNETIC_SELECTOR)).filter(
      (node) => !node.hasAttribute("data-no-magnetic"),
    );

    const cleanups = targets.map((element) => {
      const xTo = gsap.quickTo(element, "x", { duration: 0.3, ease: "elastic.out(1, 0.5)" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.3, ease: "elastic.out(1, 0.5)" });

      const onMove = (event) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        xTo(offsetX * 0.35);
        yTo(offsetY * 0.35);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", onMove, { passive: true });
      element.addEventListener("mouseleave", onLeave, { passive: true });

      return () => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
