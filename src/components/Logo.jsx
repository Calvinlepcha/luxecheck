import React from 'react';

/*
 * Minimal wordmark logo — "Luxe" in thin italic, gold accent dot, "Check" in bold.
 * Pure typography, no icons. Inspired by modern luxury house rebrandings.
 *
 * Two exports:
 *   LogoFull    — large, for hero/landing sections
 *   LogoCompact — small, for nav bar and headers
 */

function Wordmark({ fontSize, thin, bold, dotSize, gap, onClick, style }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(e); } : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        gap: 0,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: thin,
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#C9A84C',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        Luxe
      </span>
      <span
        style={{
          display: 'inline-block',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          margin: `0 ${gap}`,
          alignSelf: 'center',
          flexShrink: 0,
          transform: 'translateY(1px)',
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: bold,
          fontWeight: 700,
          color: '#F5F0E8',
          lineHeight: 1,
          letterSpacing: '0.01em',
        }}
      >
        Check
      </span>
    </div>
  );
}

export function LogoFull({ onClick, style }) {
  return (
    <Wordmark
      thin="clamp(1.75rem, 5vw, 2.5rem)"
      bold="clamp(1.75rem, 5vw, 2.5rem)"
      dotSize="5px"
      gap="6px"
      onClick={onClick}
      style={style}
    />
  );
}

export function LogoCompact({ onClick, style }) {
  return (
    <Wordmark
      thin="1.05rem"
      bold="1.05rem"
      dotSize="3px"
      gap="4px"
      onClick={onClick}
      style={style}
    />
  );
}
