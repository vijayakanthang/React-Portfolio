import { useEffect, useRef } from "react";
import { useStore } from "../../lib/store";

/** Thin top progress bar tracking scrollProgress without re-rendering. */
export default function ScrollBar() {
  const ref = useRef(null);
  useEffect(() => {
    const apply = (p) => {
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    apply(useStore.getState().scrollProgress);
    return useStore.subscribe((s) => apply(s.scrollProgress));
  }, []);
  return (
    <div className="scrollbar-track" aria-hidden="true">
      <div ref={ref} className="scrollbar-fill" />
    </div>
  );
}
