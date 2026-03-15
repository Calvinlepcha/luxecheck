import seeds from '../data/communitySeeds';

const POSTS_KEY = 'luxecheck_community_posts';
const LIKES_KEY = 'luxecheck_community_liked';
const NAME_KEY = 'luxecheck_community_name';

// ─── Initialize / Load ───────────────────────────────────────

function load() {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function save(posts) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch {}
}

export function getPosts() {
  let posts = load();
  if (!posts) {
    posts = seeds;
    save(posts);
  }
  return posts;
}

// ─── Single Post ─────────────────────────────────────────────

export function getPostById(id) {
  const posts = getPosts();
  return posts.find((p) => p.id === id) || null;
}

// ─── Create Post ─────────────────────────────────────────────

export function createPost(post) {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: Date.now(),
    likes: 0,
    replies: [],
    isSeeded: false,
  };
  posts.unshift(newPost);
  save(posts);
  return newPost;
}

// ─── Likes ───────────────────────────────────────────────────

function getLikedSet() {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLikedSet(set) {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify([...set]));
  } catch {}
}

export function isLiked(postId) {
  return getLikedSet().has(postId);
}

export function toggleLike(postId) {
  const posts = getPosts();
  const liked = getLikedSet();
  const post = posts.find((p) => p.id === postId);
  if (!post) return false;

  if (liked.has(postId)) {
    liked.delete(postId);
    post.likes = Math.max(0, post.likes - 1);
  } else {
    liked.add(postId);
    post.likes += 1;
  }
  save(posts);
  saveLikedSet(liked);
  return liked.has(postId);
}

// Reply likes use a separate key pattern
export function isReplyLiked(postId, replyIdx) {
  return getLikedSet().has(`${postId}-r${replyIdx}`);
}

export function toggleReplyLike(postId, replyIdx) {
  const posts = getPosts();
  const liked = getLikedSet();
  const post = posts.find((p) => p.id === postId);
  if (!post || !post.replies[replyIdx]) return false;

  const key = `${postId}-r${replyIdx}`;
  if (liked.has(key)) {
    liked.delete(key);
    post.replies[replyIdx].likes = Math.max(0, post.replies[replyIdx].likes - 1);
  } else {
    liked.add(key);
    post.replies[replyIdx].likes += 1;
  }
  save(posts);
  saveLikedSet(liked);
  return liked.has(key);
}

// ─── Replies ─────────────────────────────────────────────────

export function addReply(postId, author, body) {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;
  const reply = { author, body, date: Date.now(), likes: 0 };
  post.replies.push(reply);
  save(posts);
  return reply;
}

// ─── Display Name ────────────────────────────────────────────

export function getSavedName() {
  try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; }
}

export function saveName(name) {
  try { localStorage.setItem(NAME_KEY, name); } catch {}
}

// ─── Helpers ─────────────────────────────────────────────────

export function getAvatarColor(name) {
  const colors = [
    '#B8945F', '#5B8C6A', '#818CF8', '#C4956A', '#B5708E',
    '#7B9BB5', '#A65D5D', '#9B8DB5', '#5B8C6A', '#C4956A',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function formatDate(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
