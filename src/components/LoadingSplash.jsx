import React, { useState } from 'react';
import { LogoMark } from './Logo';

export default function LoadingSplash() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return (
    <div className="loading-splash" onAnimationEnd={() => setDone(true)}>
      <div style={{
        filter: 'drop-shadow(0 0 20px rgba(184, 148, 95, 0.3))',
        animation: 'goldPulse 1.5s ease-in-out infinite',
      }}>
        <LogoMark size={64} />
      </div>
    </div>
  );
}
