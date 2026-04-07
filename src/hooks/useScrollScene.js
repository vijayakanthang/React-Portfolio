import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Pins a section and returns a GSAP timeline driven by scroll progress.
 *
 * @param {object} options
 * @param {string | undefined} options.trigger
 * @param {number | boolean} options.scrubSpeed
 * @param {string} options.end
 * @param {boolean} options.disabled
 * @param {(progress: number) => void} options.onUpdate
 * @returns {{ tl: React.MutableRefObject<gsap.core.Timeline | null>, ref: React.MutableRefObject<null>, isReady: boolean }}
 */
export function useScrollScene({
  trigger,
  scrubSpeed = 1.5,
  end = "+=200%",
  disabled = false,
  onUpdate,
} = {}) {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (disabled) return undefined;

    const element = typeof trigger === "string" ? document.querySelector(trigger) : ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end,
          scrub: scrubSpeed,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (typeof onUpdate === "function") {
              onUpdate(self.progress);
            }
          },
        },
      });

      tlRef.current = timeline;
      setIsReady(true);
    }, element);

    return () => {
      setIsReady(false);
      tlRef.current?.scrollTrigger?.kill();
      tlRef.current?.kill();
      tlRef.current = null;
      ctx.revert();
    };
  }, [trigger, scrubSpeed, end, disabled, onUpdate]);

  return { tl: tlRef, ref, isReady };
}
