import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoCompact } from './Logo';

/* ─── SVG Nav Icons (thin-line, stroke 1.5, 22px) ─────────── */

const IconHome = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 21V14h6v7" />
  </svg>
);

const IconScan = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V4a1 1 0 0 1 1-1h3" />
    <path d="M17 3h3a1 1 0 0 1 1 1v3" />
    <path d="M21 17v3a1 1 0 0 1-1 1h-3" />
    <path d="M7 21H4a1 1 0 0 1-1-1v-3" />
  </svg>
);

const IconDaily = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c-1.5-1.5-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-4.5 8.5-6 10z" />
    <path d="M12 15c-1-1-3-2.8-3-5a3 3 0 0 1 6 0c0 2.2-2 4-3 5z" />
  </svg>
);

const IconCommunity = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
    <circle cx="18" cy="9" r="2.5" />
    <path d="M22 21v-1a3.5 3.5 0 0 0-3-3.46" />
  </svg>
);

const IconMore = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

const IconTips = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2z" />
    <path d="M9 21h6" />
    <path d="M10 17v-2" />
    <path d="M14 17v-2" />
  </svg>
);

const IconCollection = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconPricing = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

const IconChevron = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const NAV_ICONS = {
  '/': IconHome,
  '/scan': IconScan,
  '/daily': IconDaily,
  '/community': IconCommunity,
  '/tips': IconTips,
  '/collection': IconCollection,
  '/pricing': IconPricing,
};

// All nav items for desktop
const allNavItems = [
  { path: '/', label: 'Home' },
  { path: '/daily', label: 'Daily' },
  { path: '/scan', label: 'Scan' },
  { path: '/tips', label: 'Tips' },
  { path: '/community', label: 'Community' },
  { path: '/collection', label: 'Collection' },
  { path: '/pricing', label: 'Pricing' },
];

// Mobile bottom nav: 4 primary items + More
const mobileNavItems = [
  { path: '/', label: 'Home' },
  { path: '/scan', label: 'Scan' },
  { path: '/daily', label: 'Daily' },
  { path: '/community', label: 'Community' },
];

// Items shown in the "More" slide-up menu
const moreItems = [
  { path: '/tips', label: 'Expert Tips' },
  { path: '/collection', label: 'My Collection' },
  { path: '/pricing', label: 'Pricing' },
];

const INACTIVE = '#6B6158';
const ACTIVE = '#B8945F';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const hideNav =
    location.pathname.startsWith('/checklist') ||
    location.pathname === '/results' ||
    location.pathname === '/challenge';

  // Close "More" menu on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  // Scroll direction detection for mobile nav hide/show
  useEffect(() => {
    if (hideNav) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 50) {
          setNavHidden(false);
        } else if (y > lastScrollY.current + 8) {
          setNavHidden(true);
          setMoreOpen(false);
        } else if (y < lastScrollY.current - 4) {
          setNavHidden(false);
        }
        lastScrollY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideNav]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const moreIsActive = moreItems.some((item) => isActive(item.path));

  const handleMoreNav = useCallback((path) => {
    setMoreOpen(false);
    navigate(path);
  }, [navigate]);

  const handlePress = (key) => {
    setPressedItem(key);
    setTimeout(() => setPressedItem(null), 150);
  };

  const renderNavIcon = (path, active) => {
    const Icon = NAV_ICONS[path];
    if (!Icon) return null;
    return <Icon color={active ? ACTIVE : INACTIVE} />;
  };

  return (
    <div style={s.wrapper}>
      {/* ─── Desktop top nav ──────────────────────────── */}
      {!hideNav && (
        <nav style={s.topNav}>
          <div style={s.topNavInner}>
            <LogoCompact onClick={() => navigate('/')} />
            <div style={s.topLinks}>
              {allNavItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    style={{
                      ...s.topLink,
                      color: active ? ACTIVE : '#9B9285',
                    }}
                    onClick={() => navigate(item.path)}
                    onMouseDown={() => handlePress(item.path)}
                  >
                    {item.label}
                    {active && <span style={s.topDot} />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Gradient bottom border */}
          <div style={s.gradientBorder} />
        </nav>
      )}

      {/* ─── Page content ─────────────────────────────── */}
      <main style={{ ...s.main, ...(hideNav ? {} : s.mainWithNav) }}>
        {children}
      </main>

      {/* Footer disclaimer */}
      <div style={s.footerDisclaimer}>
        LuxeCheck uses AI-powered analysis to guide your luxury authentication. This is an educational tool and does not replace professional authentication.
      </div>

      {/* ─── More menu overlay ────────────────────────── */}
      {moreOpen && (
        <div
          style={s.overlay}
          onClick={() => setMoreOpen(false)}
        >
          <div
            style={s.moreMenu}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold handle */}
            <div style={s.moreHandle} />

            {moreItems.map((item) => {
              const active = isActive(item.path);
              const Icon = NAV_ICONS[item.path];
              const pressed = pressedItem === `more-${item.path}`;
              return (
                <button
                  key={item.path}
                  style={{
                    ...s.moreItem,
                    ...(active ? s.moreItemActive : {}),
                    transform: pressed ? 'scale(0.97)' : 'scale(1)',
                  }}
                  onClick={() => handleMoreNav(item.path)}
                  onMouseDown={() => handlePress(`more-${item.path}`)}
                >
                  <span style={s.moreIconWrap}>
                    {Icon && <Icon color={active ? ACTIVE : INACTIVE} />}
                  </span>
                  <span style={{ ...s.moreLabel, ...(active ? s.moreLabelActive : {}) }}>
                    {item.label}
                  </span>
                  <span style={s.moreChevron}>
                    <IconChevron color={active ? ACTIVE : '#4A443D'} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Mobile bottom nav ────────────────────────── */}
      {!hideNav && (
        <nav
          style={{
            ...s.bottomNav,
            transform: navHidden ? 'translateY(100%)' : 'translateY(0)',
          }}
        >
          {/* Gradient top border */}
          <div style={s.gradientBorderTop} />

          <div style={s.bottomNavInner}>
            {mobileNavItems.map((item) => {
              const active = isActive(item.path);
              const pressed = pressedItem === item.path;
              return (
                <button
                  key={item.path}
                  style={{
                    ...s.bottomItem,
                    transform: pressed ? 'scale(0.9)' : 'scale(1)',
                  }}
                  onClick={() => { handlePress(item.path); navigate(item.path); }}
                >
                  <span style={{
                    ...s.bottomIconWrap,
                    filter: active ? 'drop-shadow(0 0 4px rgba(184, 148, 95, 0.3))' : 'none',
                  }}>
                    {renderNavIcon(item.path, active)}
                  </span>
                  <span style={{
                    ...s.bottomLabel,
                    color: active ? ACTIVE : INACTIVE,
                    fontWeight: active ? 500 : 300,
                  }}>
                    {item.label}
                  </span>
                  {active && <span style={s.activeDot} />}
                </button>
              );
            })}

            {/* More button */}
            <button
              style={{
                ...s.bottomItem,
                transform: pressedItem === 'more' ? 'scale(0.9)' : 'scale(1)',
              }}
              onClick={() => { handlePress('more'); setMoreOpen((prev) => !prev); }}
            >
              <span style={{
                ...s.bottomIconWrap,
                filter: (moreIsActive || moreOpen) ? 'drop-shadow(0 0 4px rgba(184, 148, 95, 0.3))' : 'none',
              }}>
                <IconMore color={(moreIsActive || moreOpen) ? ACTIVE : INACTIVE} />
              </span>
              <span style={{
                ...s.bottomLabel,
                color: (moreIsActive || moreOpen) ? ACTIVE : INACTIVE,
                fontWeight: (moreIsActive || moreOpen) ? 500 : 300,
              }}>
                More
              </span>
              {moreIsActive && <span style={s.activeDot} />}
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

/* ─── Styles ───────────────────────────────────────────────── */

const s = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  /* ── Desktop top nav ─────────────────────────────────────── */
  topNav: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: '64px',
    flexDirection: 'column',
  },
  topNavInner: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'rgba(10, 9, 8, 0.85)',
    backdropFilter: 'blur(30px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(30px) saturate(1.8)',
  },
  topLinks: {
    display: 'flex',
    gap: '32px',
  },
  topLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 300,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  topDot: {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: ACTIVE,
    boxShadow: '0 0 8px rgba(184, 148, 95, 0.4)',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  /* ── Gradient border lines ───────────────────────────────── */
  gradientBorder: {
    height: '0.5px',
    background: 'linear-gradient(90deg, transparent, rgba(184, 148, 95, 0.3), transparent)',
    flexShrink: 0,
  },
  gradientBorderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '0.5px',
    background: 'linear-gradient(90deg, transparent, rgba(184, 148, 95, 0.3), transparent)',
  },

  /* ── Main ────────────────────────────────────────────────── */
  main: {
    flex: 1,
  },
  mainWithNav: {
    paddingBottom: '90px',
  },

  footerDisclaimer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 300,
    color: 'var(--color-cream-faint)',
    opacity: 0.5,
    textAlign: 'center',
    padding: '16px 24px 24px',
    lineHeight: 1.7,
    letterSpacing: '0.02em',
  },

  /* ── More menu overlay ───────────────────────────────────── */
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 250,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    animation: 'fadeIn 0.2s ease',
  },
  moreMenu: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '20px 20px 0 0',
    padding: '12px 20px 28px',
    paddingBottom: 'calc(28px + env(safe-area-inset-bottom) + 80px)',
    background: 'rgba(15, 14, 12, 0.92)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    animation: 'slideUp 0.3s ease',
  },
  moreHandle: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(184, 148, 95, 0.3)',
    margin: '0 auto 24px',
  },
  moreItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    height: '56px',
    padding: '0 20px',
    background: 'none',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'all 0.15s ease',
  },
  moreItemActive: {
    background: 'rgba(184, 148, 95, 0.06)',
  },
  moreIconWrap: {
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  moreLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '#9B9285',
    letterSpacing: '0.04em',
    flex: 1,
    textAlign: 'left',
  },
  moreLabelActive: {
    color: ACTIVE,
    fontWeight: 500,
  },
  moreChevron: {
    flexShrink: 0,
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
  },

  /* ── Mobile bottom nav ───────────────────────────────────── */
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    background: 'rgba(10, 9, 8, 0.85)',
    backdropFilter: 'blur(30px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(30px) saturate(1.8)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    transition: 'transform 0.3s ease',
  },
  bottomNavInner: {
    display: 'flex',
    height: '70px',
  },
  bottomItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    position: 'relative',
    transition: 'transform 0.15s ease',
    paddingBottom: '8px',
  },
  bottomIconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '22px',
    transition: 'filter 0.3s ease',
  },
  bottomLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  },
  activeDot: {
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: ACTIVE,
    boxShadow: '0 0 8px rgba(184, 148, 95, 0.4)',
  },
};

export default Layout;
