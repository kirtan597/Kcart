import { SEARCH_INDEX, CONTEXTUAL_SUGGESTIONS } from './assistantData';

const STORAGE_KEY = 'kcart_recent_pages';
const MAX_RECENT = 5;

// ── Recent pages ─────────────────────────────────────────────────────────────
export const recordPage = (name, route) => {
  try {
    const existing = getRecentPages();
    const entry = { name, route, ts: Date.now() };
    const filtered = existing.filter(p => p.route !== route);
    const updated = [entry, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}
};

export const getRecentPages = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (_) {
    return [];
  }
};

// ── Search ───────────────────────────────────────────────────────────────────
export const searchItems = (query) => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SEARCH_INDEX.filter(item =>
    item.label.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.keywords.some(k => k.includes(q))
  ).slice(0, 8);
};

// ── Highlight matching text ──────────────────────────────────────────────────
export const highlight = (text, query) => {
  if (!query.trim()) return [{ text, match: false }];
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return [{ text, match: false }];
  return [
    { text: text.slice(0, idx),           match: false },
    { text: text.slice(idx, idx + query.length), match: true  },
    { text: text.slice(idx + query.length),      match: false },
  ];
};

// ── Contextual suggestions ───────────────────────────────────────────────────
export const getSuggestions = (pathname) => {
  return CONTEXTUAL_SUGGESTIONS[pathname] || CONTEXTUAL_SUGGESTIONS.default;
};
