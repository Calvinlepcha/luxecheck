import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPostById, toggleLike, isLiked, addReply,
  toggleReplyLike, isReplyLiked,
  formatDate, getAvatarColor, getSavedName, saveName,
} from '../utils/communityStore';

const TYPE_META = {
  experience: { label: 'Experience', color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.15)' },
  advice:     { label: 'Advice',     color: '#B8945F', bg: 'rgba(184, 148, 95, 0.15)' },
  warning:    { label: 'Warning',    color: '#A65D5D', bg: 'rgba(166, 93, 93, 0.15)' },
  success:    { label: 'Success',    color: '#5B8C6A', bg: 'rgba(91, 140, 106, 0.15)' },
  question:   { label: 'Question',   color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.15)' },
};

function CommunityPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [replyLikedMap, setReplyLikedMap] = useState({});

  useEffect(() => {
    const p = getPostById(postId);
    setPost(p);
    if (p) {
      setLiked(isLiked(p.id));
      const map = {};
      p.replies.forEach((_, i) => { map[i] = isReplyLiked(p.id, i); });
      setReplyLikedMap(map);
    }
    setReplyName(getSavedName());
    window.scrollTo(0, 0);
  }, [postId]);

  const handleLike = useCallback(() => {
    if (!post) return;
    const nowLiked = toggleLike(post.id);
    setLiked(nowLiked);
    setPost(getPostById(post.id));
  }, [post]);

  const handleReplyLike = useCallback((idx) => {
    if (!post) return;
    const nowLiked = toggleReplyLike(post.id, idx);
    setReplyLikedMap((prev) => ({ ...prev, [idx]: nowLiked }));
    setPost(getPostById(post.id));
  }, [post]);

  const handleReply = useCallback(() => {
    if (!post || !replyBody.trim() || !replyName.trim()) return;
    saveName(replyName.trim());
    addReply(post.id, replyName.trim(), replyBody.trim());
    setPost(getPostById(post.id));
    setReplyBody('');
  }, [post, replyName, replyBody]);

  if (!post) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h1 style={s.errorTitle}>Post Not Found</h1>
          <p style={s.errorText}>This post may have been removed.</p>
          <button className="btn-luxe glass-btn-primary" style={s.errorBtn} onClick={() => navigate('/community')}>
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  const meta = TYPE_META[post.type] || TYPE_META.experience;
  const avatarBg = getAvatarColor(post.author);
  const isHot = post.likes >= 10;
  const isPopular = post.replies.length >= 5;

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/community')}>&larr; Community</button>

      {/* Author row */}
      <div style={s.authorRow}>
        <div style={{ ...s.avatar, backgroundColor: avatarBg }}>
          {post.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={s.authorName}>{post.author}</div>
          <div style={s.postDate}>{formatDate(post.date)}</div>
        </div>
      </div>

      {/* Badges */}
      <div style={s.badgeRow}>
        <span style={{ ...s.typeBadge, backgroundColor: meta.bg, color: meta.color }}>
          {meta.label}
        </span>
        {isHot && <span style={s.hotBadge}>Hot</span>}
        {isPopular && <span style={s.popularBadge}>Popular</span>}
      </div>

      {/* Title */}
      <h1 style={s.postTitle}>{post.title}</h1>

      {/* Tags */}
      <div style={s.tagRow}>
        {post.brand && <span style={s.brandChip}>{post.brand}</span>}
        {post.product && <span style={s.productChip}>{post.product}</span>}
      </div>

      {/* Body */}
      <div style={s.body}>
        {post.body.split('\n').map((para, i) =>
          para.trim() ? <p key={i} style={s.bodyPara}>{para}</p> : <div key={i} style={{ height: '12px' }} />
        )}
      </div>

      {/* Like + share */}
      <div style={s.actionRow}>
        <button
          style={{ ...s.likeBtn, ...(liked ? s.likeBtnActive : {}) }}
          onClick={handleLike}
        >
          {liked ? '\u2665' : '\u2661'} {post.likes}
        </button>
        <button
          style={s.shareBtn}
          onClick={async () => {
            const url = window.location.href;
            if (navigator.share) {
              try { await navigator.share({ title: post.title, url }); } catch {}
            } else {
              try { await navigator.clipboard.writeText(url); } catch {}
            }
          }}
        >
          Share
        </button>
      </div>

      {/* Divider */}
      <div style={s.divider} />

      {/* Replies */}
      <h3 style={s.repliesTitle}>
        {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
      </h3>

      {post.replies.map((reply, i) => {
        const rColor = getAvatarColor(reply.author);
        const rLiked = replyLikedMap[i];
        return (
          <div key={i} style={s.replyCard}>
            <div style={s.replyTop}>
              <div style={{ ...s.replyAvatar, backgroundColor: rColor }}>
                {reply.author.charAt(0).toUpperCase()}
              </div>
              <span style={s.replyAuthor}>{reply.author}</span>
              <span style={s.replyDate}>{formatDate(reply.date)}</span>
            </div>
            <p style={s.replyBody}>{reply.body}</p>
            <button
              style={{ ...s.replyLikeBtn, ...(rLiked ? s.replyLikeBtnActive : {}) }}
              onClick={() => handleReplyLike(i)}
            >
              {rLiked ? '\u2665' : '\u2661'} {reply.likes}
            </button>
          </div>
        );
      })}

      {/* Add Reply */}
      <div style={s.replyForm}>
        <h4 style={s.replyFormTitle}>Add a Reply</h4>
        <input
          type="text"
          placeholder="Your display name"
          value={replyName}
          onChange={(e) => setReplyName(e.target.value)}
          style={s.input}
        />
        <textarea
          placeholder="Write your reply..."
          value={replyBody}
          onChange={(e) => setReplyBody(e.target.value)}
          style={s.textarea}
          rows={4}
        />
        <button
          className="btn-luxe glass-btn-primary"
          style={{
            ...s.submitBtn,
            opacity: replyBody.trim() && replyName.trim() ? 1 : 0.4,
          }}
          onClick={handleReply}
          disabled={!replyBody.trim() || !replyName.trim()}
        >
          Post Reply
        </button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', padding: '24px 16px 60px', maxWidth: '700px', margin: '0 auto' },

  backBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-gold)',
    background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0',
    marginBottom: '24px', display: 'inline-block',
  },

  authorRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' },
  avatar: {
    width: '40px', height: '40px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
    color: '#fff', flexShrink: 0,
  },
  authorName: {
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
    color: 'var(--color-cream)',
  },
  postDate: {
    fontFamily: 'var(--font-body)', fontSize: '0.75rem',
    color: 'var(--color-cream-muted)', opacity: 0.5,
  },

  badgeRow: { display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' },
  typeBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: '8px',
  },
  hotBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: '8px',
    backgroundColor: 'rgba(251,146,60,0.15)', color: '#FB923C',
  },
  popularBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: '8px',
    backgroundColor: 'rgba(129,140,248,0.15)', color: '#818CF8',
  },

  postTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.3rem, 4.5vw, 1.75rem)',
    fontWeight: 700, color: 'var(--color-cream)',
    lineHeight: 1.3, marginBottom: '12px',
    letterSpacing: '0.15em', textTransform: 'uppercase',
  },

  tagRow: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  brandChip: {
    fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 300,
    color: 'var(--color-gold)', background: 'rgba(184,148,95,0.1)',
    padding: '3px 10px', borderRadius: '12px',
  },
  productChip: {
    fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'rgba(255,255,255,0.02)',
    padding: '3px 10px', borderRadius: '12px',
  },

  body: { marginBottom: '24px' },
  bodyPara: {
    fontFamily: 'var(--font-body)', fontSize: '0.93rem', fontWeight: 300, lineHeight: 1.75,
    color: 'var(--color-cream)', marginBottom: '16px', opacity: 0.88,
  },

  actionRow: { display: 'flex', gap: '12px', marginBottom: '8px' },
  likeBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
    padding: '10px 18px', cursor: 'pointer', transition: 'all 0.4s ease',
  },
  likeBtnActive: {
    color: '#A65D5D', borderColor: 'rgba(166,93,93,0.3)',
    background: 'rgba(166,93,93,0.08)',
  },
  shareBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300,
    color: 'var(--color-gold)', background: 'none',
    border: '1px solid rgba(184,148,95,0.25)', borderRadius: '12px',
    padding: '10px 18px', cursor: 'pointer',
  },

  divider: { height: '1px', background: 'rgba(184,148,95,0.1)', margin: '28px 0' },

  repliesTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600,
    color: 'var(--color-cream)', marginBottom: '16px',
    letterSpacing: '0.15em', textTransform: 'uppercase',
  },

  replyCard: {
    padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
  },
  replyTop: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  replyAvatar: {
    width: '26px', height: '26px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700,
    color: '#fff', flexShrink: 0,
  },
  replyAuthor: {
    fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
    color: 'var(--color-cream)', flex: 1,
  },
  replyDate: {
    fontFamily: 'var(--font-body)', fontSize: '0.68rem',
    color: 'var(--color-cream-muted)', opacity: 0.5,
  },
  replyBody: {
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65,
    color: 'var(--color-cream)', opacity: 0.85, paddingLeft: '36px',
  },
  replyLikeBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.72rem',
    color: 'var(--color-cream-muted)', background: 'none',
    border: 'none', cursor: 'pointer', paddingLeft: '36px',
    marginTop: '6px', opacity: 0.6, transition: 'all 0.4s ease',
  },
  replyLikeBtnActive: { color: '#A65D5D', opacity: 1 },

  // Reply form
  replyForm: { marginTop: '28px' },
  replyFormTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600,
    color: 'var(--color-cream)', marginBottom: '14px',
    letterSpacing: '0.15em', textTransform: 'uppercase',
  },
  input: {
    width: '100%', padding: '12px 16px',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--color-cream)',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', outline: 'none', marginBottom: '10px', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '12px 16px', minHeight: '100px', resize: 'vertical',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--color-cream)',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box',
  },
  submitBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700,
    color: 'var(--color-cream)', padding: '12px 24px', cursor: 'pointer',
    transition: 'opacity 0.4s ease',
  },

  errorTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-cream)', marginBottom: '12px' },
  errorText: { fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-cream-muted)', marginBottom: '24px' },
  errorBtn: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-cream)', padding: '14px 28px', cursor: 'pointer' },
};

export default CommunityPost;
