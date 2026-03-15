import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { matchResponse } from '../data/chatResponses';
import { getBag } from '../data/bags';
import { LogoMark } from './Logo';

const CONTEXT_TIMEOUT = 5 * 60 * 1000; // 5 minutes

function getContextBag(pathname) {
  const match = pathname.match(/^\/checklist\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return getBag(match[1], match[2]);
}

// Typing delay proportional to response length
function getTypingDelay(text) {
  if (!text) return 400;
  const len = text.length;
  if (len < 80) return 300;
  if (len < 200) return 500;
  return 800;
}

// ─── Chat icon SVG ────────────────────────────────────────────
function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        fill="#0A0A0A"
      />
      <circle cx="8" cy="10" r="1.2" fill="#B8945F" />
      <circle cx="12" cy="10" r="1.2" fill="#B8945F" />
      <circle cx="16" cy="10" r="1.2" fill="#B8945F" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#0A0A0A" />
    </svg>
  );
}

// ─── Typing indicator ─────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={s.msgRow}>
      <div style={s.avatar}><LogoMark size={20} /></div>
      <div style={{ ...s.bubble, ...s.botBubble }}>
        <div style={s.typingDots}>
          <span style={{ ...s.dot, animationDelay: '0ms' }} />
          <span style={{ ...s.dot, animationDelay: '150ms' }} />
          <span style={{ ...s.dot, animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Format markdown-lite (bold only) ─────────────────────────
function formatText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--color-cream)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// ─── Main component ───────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  // ── Conversation context tracking ──
  const contextRef = useRef({
    lastBrand: null,
    lastProduct: null,
    lastCategory: null,
    lastActivityTime: Date.now(),
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Welcome message on first open
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true);
      const contextBag = getContextBag(location.pathname);

      // Set initial context from checklist page
      if (contextBag) {
        contextRef.current.lastBrand = contextBag.brand?.toLowerCase() || null;
        contextRef.current.lastProduct = 'bags';
      }

      const welcomeText = contextBag
        ? `Hi! I'm LuxeCheck's AI authentication expert. I see you're checking a ${contextBag.brand} ${contextBag.model}. Need help with any of the checkpoints?\n\nI can help with authentication tips for bags, watches, shoes, perfumes, jewelry, and more — just ask!`
        : "Hi! I'm LuxeCheck's AI authentication expert. I can help you authenticate luxury bags, watches, shoes, perfumes, jewelry, and accessories from over 30 brands. Ask me anything!";

      setMessages([
        {
          id: 'welcome',
          from: 'bot',
          text: welcomeText,
          chips: ['How do I spot a fake?', "What's a datecode?", 'Is my bag worth reselling?'],
        },
      ]);
    }
  }, [open, initialized, location.pathname]);

  // Clear history when panel closes — reset for fresh start
  const handleClose = useCallback(() => {
    setOpen(false);
    setInitialized(false);
    setMessages([]);
    contextRef.current = {
      lastBrand: null,
      lastProduct: null,
      lastCategory: null,
      lastActivityTime: Date.now(),
    };
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  // Listen for external open-chat events (e.g. from Scan page "Chat with Expert")
  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      if (e.detail?.message) {
        // Small delay to let the chat initialize first
        setTimeout(() => {
          setInput(e.detail.message);
        }, 400);
      }
    };
    window.addEventListener('luxecheck-open-chat', handler);
    return () => window.removeEventListener('luxecheck-open-chat', handler);
  }, []);

  const addBotResponse = useCallback((text, chips, delay) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          from: 'bot',
          text,
          chips,
        },
      ]);
    }, delay);
  }, []);

  const handleSend = useCallback(
    (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || typing) return;

      // Add user message
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, from: 'user', text: trimmed },
      ]);
      setInput('');

      // Check if context has expired (5 min idle)
      const now = Date.now();
      if (now - contextRef.current.lastActivityTime > CONTEXT_TIMEOUT) {
        contextRef.current.lastBrand = null;
        contextRef.current.lastProduct = null;
        contextRef.current.lastCategory = null;
      }
      contextRef.current.lastActivityTime = now;

      // Match with context
      const result = matchResponse(trimmed, contextRef.current);

      // Update context from result
      if (result.detectedBrand) contextRef.current.lastBrand = result.detectedBrand;
      if (result.detectedProduct) contextRef.current.lastProduct = result.detectedProduct;
      if (result.category) contextRef.current.lastCategory = result.category;

      // Dynamic typing delay
      const delay = getTypingDelay(result.response);
      addBotResponse(result.response, result.followUp, delay);
    },
    [input, typing, addBotResponse],
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (chip) => {
    handleSend(chip);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          className="chatbot-fab glass-btn-primary"
          style={s.fab}
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <ChatIcon />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={`chatbot-panel glass-panel ${open ? 'chatbot-panel-open' : ''}`}
        style={s.panel}
      >
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <div style={s.headerAvatar}>LC</div>
            <div>
              <div style={s.headerName}>LuxeCheck AI Expert</div>
              <div style={s.headerStatus}>
                <span style={s.onlineDot} />
                Online
              </div>
            </div>
          </div>
          <button
            style={s.closeBtn}
            onClick={handleClose}
            aria-label="Close chat"
          >
            {'\u00d7'}
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={s.messages}>
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className="chat-msg-appear"
              style={{ animationDelay: `${idx === messages.length - 1 ? 0 : 0}ms` }}
            >
              {msg.from === 'bot' ? (
                <div style={s.msgRow}>
                  <div style={s.avatar}><LogoMark size={20} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...s.bubble, ...s.botBubble }}>
                      {msg.text.split('\n').map((line, li) => (
                        <React.Fragment key={li}>
                          {li > 0 && <br />}
                          {formatText(line)}
                        </React.Fragment>
                      ))}
                    </div>
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="chat-chips-appear" style={s.chipsRow}>
                        {msg.chips.map((chip) => (
                          <button
                            key={chip}
                            className="btn-luxe"
                            style={s.chip}
                            onClick={() => handleChipClick(chip)}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={s.userRow}>
                  <div style={{ ...s.bubble, ...s.userBubble }}>{msg.text}</div>
                </div>
              )}
            </div>
          ))}
          {typing && <TypingIndicator />}
        </div>

        {/* Input */}
        <div style={s.inputBar}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about authentication..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={s.input}
          />
          <button
            style={{
              ...s.sendBtn,
              opacity: input.trim() ? 1 : 0.4,
            }}
            onClick={() => handleSend()}
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Backdrop on mobile when open */}
      {open && <div className="chatbot-backdrop glass-modal-backdrop" style={s.backdrop} onClick={handleClose} />}
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const s = {
  fab: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(184, 148, 95, 0.25)',
    border: '1px solid rgba(184, 148, 95, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9990,
    boxShadow: '0 4px 20px rgba(184, 148, 95, 0.3)',
  },

  panel: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    maxWidth: '400px',
    height: '70vh',
    maxHeight: '600px',
    borderTop: '2px solid var(--color-gold)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9995,
    overflow: 'hidden',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid rgba(184, 148, 95, 0.15)',
    flexShrink: 0,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  headerAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--color-gold)',
    color: '#0A0A0A',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    lineHeight: 1.2,
  },

  headerStatus: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--color-cream-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  onlineDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#5B8C6A',
    display: 'inline-block',
  },

  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-cream-muted)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '4px 8px',
    lineHeight: 1,
  },

  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    WebkitOverflowScrolling: 'touch',
  },

  msgRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },

  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--color-gold)',
    color: '#0A0A0A',
    fontFamily: 'var(--font-body)',
    fontSize: '0.55rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },

  bubble: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '100%',
  },

  botBubble: {
    background: 'rgba(255, 255, 255, 0.02)',
    color: 'var(--color-cream-muted)',
    borderTopLeftRadius: '4px',
  },

  userRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  userBubble: {
    background: 'rgba(184, 148, 95, 0.15)',
    color: 'var(--color-cream)',
    borderTopRightRadius: '4px',
    maxWidth: '80%',
    fontWeight: 300,
    border: '1px solid rgba(184, 148, 95, 0.2)',
  },

  chipsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
  },

  chip: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-gold)',
    background: 'rgba(184, 148, 95, 0.06)',
    border: '1px solid rgba(184, 148, 95, 0.15)',
    borderRadius: '12px',
    padding: '6px 14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  },

  inputBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
    flexShrink: 0,
  },

  input: {
    flex: 1,
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--color-cream)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(184, 148, 95, 0.1)',
    borderRadius: '12px',
    padding: '10px 16px',
    outline: 'none',
    WebkitAppearance: 'none',
    fontWeight: 300,
    lineHeight: 1.7,
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
  },

  sendBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'var(--color-gold)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.4s ease',
  },

  typingDots: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '4px 0',
  },

  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--color-cream-muted)',
    display: 'inline-block',
    animation: 'dotBounce 0.8s ease-in-out infinite',
  },

  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 9994,
  },
};
