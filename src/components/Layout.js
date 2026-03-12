import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoCompact } from './Logo';

const navItems = [
  { path: '/', label: 'Home', icon: '\u2302' },
  { path: '/scan', label: 'Scan', icon: '\u2316' },
  { path: '/collection', label: 'Collection', icon: '\u25A3' },
  { path: '/pricing', label: 'Pricing', icon: '\u2606' },
];

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on checklist and results (wizard flow)
  const hideNav = location.pathname.startsWith('/checklist') || location.pathname === '/results';

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={s.wrapper}>
      {/* Top nav (desktop) */}
      {!hideNav && (
        <nav style={s.topNav}>
          <LogoCompact onClick={() => navigate('/')} />
          <div style={s.topLinks}>
            {navItems.map((item) => (
              <button
                key={item.path}
                style={{
                  ...s.topLink,
                  ...(isActive(item.path) ? s.topLinkActive : {}),
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Page content */}
      <main style={{ ...s.main, ...(hideNav ? {} : s.mainWithNav) }}>
        {children}
      </main>

      {/* Footer disclaimer */}
      <div style={s.footerDisclaimer}>
        LuxeCheck is an educational reference tool. It does not guarantee authenticity.
      </div>

      {/* Bottom nav (mobile) */}
      {!hideNav && (
        <nav style={s.bottomNav}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                style={{
                  ...s.bottomItem,
                  ...(active ? s.bottomItemActive : {}),
                }}
                onClick={() => navigate(item.path)}
              >
                <span style={{ ...s.bottomIcon, ...(active ? s.bottomIconActive : {}) }}>
                  {item.icon}
                </span>
                <span style={{ ...s.bottomLabel, ...(active ? s.bottomLabelActive : {}) }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

const s = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  // ─── Top nav (desktop, hidden on mobile via CSS) ───
  topNav: {
    display: 'none', // overridden by injected CSS at 768px
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '56px',
    borderBottom: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  topLogo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    cursor: 'pointer',
    letterSpacing: '0.05em',
  },

  topLinks: {
    display: 'flex',
    gap: '8px',
  },

  topLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--color-cream-muted)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 14px',
    letterSpacing: '0.03em',
    transition: 'color 0.2s',
  },

  topLinkActive: {
    color: 'var(--color-gold)',
  },

  // ─── Main ──────────────────────────────────────────
  main: {
    flex: 1,
  },

  mainWithNav: {
    paddingBottom: '72px', // space for bottom nav on mobile
  },

  // ─── Footer disclaimer ────────────────────────────
  footerDisclaimer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.35,
    textAlign: 'center',
    padding: '12px 24px 20px',
    lineHeight: 1.5,
  },

  // ─── Bottom nav (mobile, hidden on desktop via CSS) ─
  bottomNav: {
    display: 'flex', // overridden to none at 768px
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--color-bg)',
    borderTop: '1px solid var(--color-border)',
    zIndex: 100,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },

  bottomItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: '10px 0 8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },

  bottomItemActive: {},

  bottomIcon: {
    fontSize: '1.15rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.5,
    transition: 'color 0.2s, opacity 0.2s',
  },

  bottomIconActive: {
    color: 'var(--color-gold)',
    opacity: 1,
  },

  bottomLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    color: 'var(--color-cream-muted)',
    opacity: 0.5,
    transition: 'color 0.2s, opacity 0.2s',
  },

  bottomLabelActive: {
    color: 'var(--color-gold)',
    opacity: 1,
  },
};

export default Layout;
