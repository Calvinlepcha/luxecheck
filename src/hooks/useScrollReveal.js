import { useEffect } from 'react';

/**
 * Observes all .reveal / .reveal-left / .reveal-right elements in the DOM
 * and adds .visible when they enter the viewport.
 * Stagger delay is handled via inline transitionDelay on each element.
 *
 * @param {Array} deps - re-run observation when these change (e.g. [items.length])
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Small delay so dynamic content (useEffect state updates) is rendered
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)')
        .forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
