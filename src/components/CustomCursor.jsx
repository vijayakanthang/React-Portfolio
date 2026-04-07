import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = "a, button, [role='button'], input[type='submit'], input[type='button']";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const pointRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const setMode = () => setEnabled(media.matches);

    setMode();
    media.addEventListener("change", setMode);
    return () => media.removeEventListener("change", setMode);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const tick = () => {
      pointRef.current.x += (targetRef.current.x - pointRef.current.x) * 0.2;
      pointRef.current.y += (targetRef.current.y - pointRef.current.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pointRef.current.x}px, ${pointRef.current.y}px, 0)`;
      }
      frameRef.current = window.requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    const onPointerOver = (event) => {
      setHovered(Boolean(event.target?.closest(HOVER_SELECTOR)));
    };

    const onPointerDown = () => {
      setClicked(true);
      window.setTimeout(() => setClicked(false), 120);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onPointerOver, { passive: true });
    window.addEventListener("mousedown", onPointerDown, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onPointerOver);
      window.removeEventListener("mousedown", onPointerDown);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor ${hovered ? "is-hovered" : ""} ${clicked ? "is-clicked" : ""}`}
    />
  );
}
