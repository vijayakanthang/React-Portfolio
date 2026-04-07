import { useEffect, useState } from "react";

function getMediaQueryMatch(query, fallback = false) {
  if (typeof window === "undefined") return fallback;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query, fallback = false) {
  const [matches, setMatches] = useState(() => getMediaQueryMatch(query, fallback));

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function useMotionPreferences() {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const prefersReducedMotion = usePrefersReducedMotion();

  return { isDesktop, prefersReducedMotion };
}
