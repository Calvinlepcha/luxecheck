import { useEffect, useRef } from 'react';

/**
 * Custom gold cursor for desktop only.
 * Renders a small gold dot (instant follow) and a larger ring (lerped follow).
 * Expands the ring on hovering clickable elements.
 * Skipped entirely on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    // Skip on touch-primary devices
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Create elements
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ringEl = document.createElement('div');
    ringEl.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ringEl);
    dotRef.current = dot;
    ringRef.current = ringEl;

    document.documentElement.classList.add('cursor-active');

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!dot.classList.contains('active')) dot.classList.add('active');
      if (!ringEl.classList.contains('active')) ringEl.classList.add('active');
    };

    const onOver = (e) => {
      const hit = e.target.closest(
        'button, a, [role="button"], input, select, textarea, [data-clickable], label[for]'
      );
      ringEl.classList.toggle('expanded', !!hit);
    };

    const onLeave = () => {
      dot.classList.remove('active');
      ringEl.classList.remove('active');
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove('cursor-active');
      dot.remove();
      ringEl.remove();
    };
  }, []);

  return null; // renders via DOM, not React
}
