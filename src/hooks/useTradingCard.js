import { useEffect } from "react";
import gsap from "gsap";

export default function useTradingCard(selector = ".trading-card", disabled = false) {
  useEffect(() => {
    if (disabled) return undefined;
    const cards = Array.from(document.querySelectorAll(selector));

    const cleanups = cards.map((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((my - cy) / rect.height) * -30;
        const rotateY = ((mx - cx) / rect.width) * 30;
        const glareX = (mx / rect.width) * 100;
        const glareY = (my / rect.height) * 100;
        const hue = (event.clientX / window.innerWidth) * 360;

        card.style.setProperty("--glare-x", `${glareX}%`);
        card.style.setProperty("--glare-y", `${glareY}%`);
        card.style.setProperty("--hue", hue);

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: "power2.out",
          transformPerspective: 600,
        });
      };

      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [selector, disabled]);
}