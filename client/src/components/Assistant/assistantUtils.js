import { useState, useEffect, useCallback } from 'react';

export const useDebounce = (value, delay = 200) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

export const useAssistantKeyboard = (open, setOpen) => {
  const handler = useCallback((e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === '?' && !e.ctrlKey && !e.metaKey &&
        !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
      e.preventDefault(); setOpen(o => !o); return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault(); setOpen(o => !o);
    }
  }, [setOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
};
