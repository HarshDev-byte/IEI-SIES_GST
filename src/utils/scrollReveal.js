import { useEffect } from 'react';

/**
 * ============================================================================
 * HIGH-PERFORMANCE 240Hz SCROLL REVEAL HOOK
 * Hardware-accelerated (translate3d + opacity) using GPU compositor layers.
 * Designed specifically for 60Hz / 120Hz / 144Hz / 240Hz+ high-refresh displays.
 * ============================================================================
 */

export function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const targets = containerRef.current.querySelectorAll('.reveal-on-scroll');
    if (!targets || targets.length === 0) return;

    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
      }
    );

    targets.forEach((el) => {
      // Check if element is already within viewport on initial render
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);
}
