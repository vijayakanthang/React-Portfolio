import { useEffect } from "react";
import gsap from "gsap";

export default function useTilt(selector = ".project-float-card", disabled = false) {
  useEffect(() => {
    if (disabled) return undefined;
    const nodes = Array.from(document.querySelectorAll(selector));

    const cleanups = nodes.map((node) => {
      const onMove = (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 30;
        const rotateX = (0.5 - py) * 30;
        node.style.setProperty("--sheen-x", `${px * 100}%`);
        node.style.setProperty("--sheen-y", `${py * 100}%`);
        gsap.to(node, {
          rotateX,
          rotateY,
          duration: 0.25,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };
      const onLeave = () => {
        gsap.to(node, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
      };
      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseleave", onLeave);
      return () => {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [selector, disabled]);
}