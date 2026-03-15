import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 25;
const CURSOR_RADIUS = 100;
const CURSOR_PUSH = 0.8;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function createParticle(w, h) {
  const size = rand(3, 15);
  // 0 = diamond, 1 = circle, 2 = dot
  const shape = size < 6 ? 2 : Math.random() < 0.5 ? 0 : 1;
  return {
    x: 0,
    y: rand(0, h),
    baseX: rand(0, w),
    size,
    shape,
    speed: rand(0.15, 0.45),
    swayAmp: rand(8, 25),
    swaySpeed: rand(0.0005, 0.0015),
    swayOffset: rand(0, Math.PI * 2),
    baseOpacity: rand(0.05, 0.15),
    nudgeX: 0,
    nudgeY: 0,
  };
}

export default function ChecklistBackground({ progress = 0 }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const isMobile = window.matchMedia('(hover: none)').matches;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let particles = [];
    let animId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.parentElement.clientWidth;
      h = canvas.parentElement.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const count = isMobile ? Math.min(PARTICLE_COUNT, 18) : PARTICLE_COUNT;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(w, h));
    }

    const handleMouse = (e) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    let lastTime = performance.now();

    const draw = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      ctx.clearRect(0, 0, w, h);

      const prog = progressRef.current;
      const brightnessBoost = prog < 0.4 ? 0 : prog < 0.7 ? (prog - 0.4) / 0.3 * 0.5 : 0.5 + (prog - 0.7) / 0.3 * 0.5;
      const speedMultiplier = 1 + prog * 0.4;

      // Bottom gradient (fades in after ~40% progress)
      if (brightnessBoost > 0) {
        const grad = ctx.createLinearGradient(0, h * 0.7, 0, h);
        grad.addColorStop(0, 'rgba(184, 148, 95, 0)');
        grad.addColorStop(1, `rgba(184, 148, 95, ${brightnessBoost * 0.04})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of particles) {
        // Float upward
        p.y -= p.speed * speedMultiplier * (dt / 16);

        // Sway horizontally
        const sway = Math.sin(now * p.swaySpeed + p.swayOffset) * p.swayAmp;
        let drawX = p.baseX + sway;
        let drawY = p.y;

        // Cursor repulsion (desktop only)
        if (!isMobile) {
          const dx = drawX - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS && dist > 0) {
            const force = (1 - dist / CURSOR_RADIUS) * CURSOR_PUSH;
            p.nudgeX += (dx / dist) * force;
            p.nudgeY += (dy / dist) * force;
          }
        }

        // Decay nudge smoothly
        p.nudgeX *= 0.96;
        p.nudgeY *= 0.96;
        drawX += p.nudgeX;
        drawY += p.nudgeY;

        // Wrap at top → reappear at bottom
        if (p.y < -p.size * 2) {
          p.y = h + p.size * 2;
          p.baseX = rand(0, w);
          p.nudgeX = 0;
          p.nudgeY = 0;
        }

        // Draw particle
        const opacity = p.baseOpacity + brightnessBoost * 0.08;
        ctx.strokeStyle = `rgba(184, 148, 95, ${opacity})`;
        ctx.fillStyle = `rgba(184, 148, 95, ${opacity})`;
        ctx.lineWidth = 1;

        if (p.shape === 2) {
          // Dot (filled)
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 1) {
          // Circle outline
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Diamond outline
          const half = p.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(drawX, drawY - half);
          ctx.lineTo(drawX + half * 0.6, drawY);
          ctx.lineTo(drawX, drawY + half);
          ctx.lineTo(drawX - half * 0.6, drawY);
          ctx.closePath();
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="checklist-bg-fallback"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
