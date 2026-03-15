import React from 'react';

/*
 * LuxeCheck "The Seal" Logo System
 *
 * Heritage-style logo mark inspired by luxury wax seals and hallmark stamps.
 * Outer circle with decorative notches → inner diamond → embedded L/C monogram
 * → radiating lines → decorative dots at intersections.
 *
 * Exports:
 *   LogoMark        — circular seal mark only
 *   LogoWordmark    — text with decorative lines only
 *   LogoFull        — vertical: mark above wordmark
 *   LogoCompact     — horizontal: mark left, wordmark right (desktop nav)
 *   LogoMarkAnimated — mark with draw-in animation (landing page only)
 */

const GOLD = '#B8945F';
const CREAM = '#EDE6DB';

// ─── The Seal Mark (SVG) ──────────────────────────────────────
// viewBox is 100x100, center at 50,50
function SealMark({ size = 48, color = GOLD, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Outer circle with subtle notches at cardinal points */}
      <g stroke={color} strokeLinecap="round">
        {/* Main outer circle — slightly thicker */}
        <circle cx="50" cy="50" r="46" strokeWidth="1.5" />

        {/* Decorative notches at cardinal points (small inward V marks) */}
        <line x1="50" y1="2" x2="50" y2="6" strokeWidth="1" />
        <line x1="50" y1="94" x2="50" y2="98" strokeWidth="1" />
        <line x1="2" y1="50" x2="6" y2="50" strokeWidth="1" />
        <line x1="94" y1="50" x2="98" y2="50" strokeWidth="1" />

        {/* Small diamond notch markers at cardinals */}
        <polygon points="50,2 48.5,5 50,4 51.5,5" fill={color} stroke="none" />
        <polygon points="50,98 48.5,95 50,96 51.5,95" fill={color} stroke="none" />
        <polygon points="2,50 5,48.5 4,50 5,51.5" fill={color} stroke="none" />
        <polygon points="98,50 95,48.5 96,50 95,51.5" fill={color} stroke="none" />
      </g>

      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="0.5" />

      {/* 12 radiating lines from inner ring to outer, like clock facets */}
      <g stroke={color} strokeWidth="0.5" strokeLinecap="round">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 28 * Math.cos(rad);
          const y1 = 50 + 28 * Math.sin(rad);
          const x2 = 50 + 38 * Math.cos(rad);
          const y2 = 50 + 38 * Math.sin(rad);
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Central diamond rotated 45deg */}
      <rect
        x="50"
        y="50"
        width="24"
        height="24"
        transform="rotate(45 50 50) translate(-12 -12)"
        stroke={color}
        strokeWidth="1"
        fill="none"
        rx="1"
      />

      {/* Inner diamond — smaller, creates depth */}
      <rect
        x="50"
        y="50"
        width="16"
        height="16"
        transform="rotate(45 50 50) translate(-8 -8)"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
      />

      {/* L and C monogram formed from geometric lines within the diamond */}
      <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* L — vertical stroke + base, left side of center */}
        <polyline points="42,39 42,53 48,53" fill="none" />
        {/* C — open arc, right side of center */}
        <path d="M58,41 C54,38 51,40 51,47 C51,54 54,56 58,53" fill="none" />
      </g>

      {/* Decorative dots at 12 clock positions on inner ring (2px) */}
      <g fill={color}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 33 * Math.cos(rad);
          const cy = 50 + 33 * Math.sin(rad);
          return <circle key={`dot-${angle}`} cx={cx} cy={cy} r="1" />;
        })}
      </g>

      {/* 4 larger accent dots at diagonal positions (between rings) */}
      <g fill={color}>
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 42 * Math.cos(rad);
          const cy = 50 + 42 * Math.sin(rad);
          return <circle key={`accent-${angle}`} cx={cx} cy={cy} r="1.2" />;
        })}
      </g>
    </svg>
  );
}

// ─── Animated Seal Mark (landing page draw-in) ────────────────
function SealMarkAnimated({ size = 48, color = GOLD, style }) {
  const animStyle = `
    @keyframes drawCircle {
      from { stroke-dashoffset: 290; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes drawInner {
      from { stroke-dashoffset: 240; opacity: 0; }
      to { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes fadeInDots {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .seal-outer { stroke-dasharray: 290; stroke-dashoffset: 290; animation: drawCircle 0.8s ease-out forwards; }
    .seal-inner-ring { stroke-dasharray: 240; stroke-dashoffset: 240; animation: drawInner 0.6s ease-out 0.5s forwards; opacity: 0; }
    .seal-geometry { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawInner 0.6s ease-out 0.6s forwards; opacity: 0; }
    .seal-lines { stroke-dasharray: 20; stroke-dashoffset: 20; animation: drawInner 0.4s ease-out 0.7s forwards; opacity: 0; }
    .seal-mono { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawInner 0.5s ease-out 0.9s forwards; opacity: 0; }
    .seal-dots { animation: fadeInDots 0.3s ease-out 1.2s forwards; opacity: 0; }
    .seal-notches { animation: fadeInDots 0.3s ease-out 0.4s forwards; opacity: 0; }
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <style>{animStyle}</style>

      {/* Outer circle */}
      <circle className="seal-outer" cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Cardinal notches */}
      <g className="seal-notches" stroke={color} strokeWidth="1" strokeLinecap="round">
        <line x1="50" y1="2" x2="50" y2="6" />
        <line x1="50" y1="94" x2="50" y2="98" />
        <line x1="2" y1="50" x2="6" y2="50" />
        <line x1="94" y1="50" x2="98" y2="50" />
        <polygon points="50,2 48.5,5 50,4 51.5,5" fill={color} stroke="none" />
        <polygon points="50,98 48.5,95 50,96 51.5,95" fill={color} stroke="none" />
        <polygon points="2,50 5,48.5 4,50 5,51.5" fill={color} stroke="none" />
        <polygon points="98,50 95,48.5 96,50 95,51.5" fill={color} stroke="none" />
      </g>

      {/* Inner ring */}
      <circle className="seal-inner-ring" cx="50" cy="50" r="38" stroke={color} strokeWidth="0.5" />

      {/* Radiating lines */}
      <g className="seal-lines" stroke={color} strokeWidth="0.5" strokeLinecap="round">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 28 * Math.cos(rad);
          const y1 = 50 + 28 * Math.sin(rad);
          const x2 = 50 + 38 * Math.cos(rad);
          const y2 = 50 + 38 * Math.sin(rad);
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Diamonds */}
      <g className="seal-geometry">
        <rect x="50" y="50" width="24" height="24" transform="rotate(45 50 50) translate(-12 -12)" stroke={color} strokeWidth="1" fill="none" rx="1" />
        <rect x="50" y="50" width="16" height="16" transform="rotate(45 50 50) translate(-8 -8)" stroke={color} strokeWidth="0.5" fill="none" />
      </g>

      {/* L C monogram */}
      <g className="seal-mono" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="42,39 42,53 48,53" fill="none" />
        <path d="M58,41 C54,38 51,40 51,47 C51,54 54,56 58,53" fill="none" />
      </g>

      {/* Dots */}
      <g className="seal-dots" fill={color}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 33 * Math.cos(rad);
          const cy = 50 + 33 * Math.sin(rad);
          return <circle key={`dot-${angle}`} cx={cx} cy={cy} r="1" />;
        })}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 42 * Math.cos(rad);
          const cy = 50 + 42 * Math.sin(rad);
          return <circle key={`accent-${angle}`} cx={cx} cy={cy} r="1.2" />;
        })}
      </g>
    </svg>
  );
}

// ─── Wordmark with decorative lines ───────────────────────────
function Wordmark({ fontSize = '1rem', color = CREAM, goldColor = GOLD, onClick, style }) {
  const lineWidth = '100%';
  const diamondSize = 3;

  const DiamondCap = ({ align }) => (
    <svg width={diamondSize * 2} height={diamondSize * 2} viewBox="0 0 6 6" style={{ flexShrink: 0 }}>
      <polygon points="3,0 6,3 3,6 0,3" fill={goldColor} />
    </svg>
  );

  const DecorativeLine = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: lineWidth }}>
      <DiamondCap />
      <div style={{ flex: 1, height: '0.5px', background: goldColor, opacity: 0.5 }} />
      <DiamondCap />
    </div>
  );

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(e); } : undefined}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        gap: '6px',
        ...style,
      }}
    >
      <DecorativeLine />
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize,
          fontWeight: 400,
          color,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        LUXECHECK
      </span>
      <DecorativeLine />
    </div>
  );
}

// ─── Logo Variations ──────────────────────────────────────────

// Full vertical: mark on top, wordmark below
export function LogoFull({ size = 80, color = GOLD, textColor = CREAM, onClick, style, animated }) {
  const Mark = animated ? SealMarkAnimated : SealMark;
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(e); } : undefined}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${size * 0.2}px`,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    >
      <Mark size={size} color={color} />
      <Wordmark
        fontSize={`${Math.max(size * 0.16, 11)}px`}
        color={textColor}
        goldColor={color}
      />
    </div>
  );
}

// Horizontal: mark left, wordmark right
export function LogoCompact({ size = 32, color = GOLD, textColor = CREAM, onClick, style }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(e); } : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${size * 0.4}px`,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    >
      <SealMark size={size} color={color} />
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: `${Math.max(size * 0.38, 10)}px`,
          fontWeight: 400,
          color: textColor,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        LUXECHECK
      </span>
    </div>
  );
}

// Mark only — for favicon, avatar, badges
export function LogoMark({ size = 48, color = GOLD, style, className }) {
  return <SealMark size={size} color={color} style={style} className={className} />;
}

// Wordmark only — text with decorative lines
export function LogoWordmarkOnly({ fontSize = '1rem', color = CREAM, goldColor = GOLD, onClick, style }) {
  return <Wordmark fontSize={fontSize} color={color} goldColor={goldColor} onClick={onClick} style={style} />;
}

// Animated mark — landing page only
export function LogoMarkAnimated({ size = 48, color = GOLD, style }) {
  return <SealMarkAnimated size={size} color={color} style={style} />;
}

export default LogoFull;
