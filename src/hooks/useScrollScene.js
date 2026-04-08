import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * useScrollScene
 * Pinned ScrollTrigger scene utility
 * 
 * @param {Object} options 
 * @param {React.RefObject} options.trigger - Element that starts the scroll effect.
 * @param {number} [options.scrub=1] - GSAP scrub value.
 * @param {string} [options.start='top top'] - Trigger start position.
 * @param {string} [options.end='+=200%'] - Pin duration / Trigger end position.
 * @param {boolean} [options.pin=true] - Whether to pin the trigger element.
 * @param {Function} [options.onUpdate] - Optional update callback.
 */
export const useScrollScene = ({
  trigger,
  scrub = 1,
  start = 'top top',
  end = '+=200%',
  pin = true,
  onUpdate
}) => {
  const tlRef = useRef(null);

  useGSAP(() => {
    if (!trigger.current) return;

    // Create the GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger.current,
        start: start,
        end: end,
        scrub: scrub,
        pin: pin,
        anticipatePin: 1,
        onUpdate: onUpdate,
        // Default cleanup is handled by useGSAP
      },
    });

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        if (tlRef.current.scrollTrigger) {
          tlRef.current.scrollTrigger.kill();
        }
      }
    };
  }, { scope: trigger });

  return tlRef;
};
