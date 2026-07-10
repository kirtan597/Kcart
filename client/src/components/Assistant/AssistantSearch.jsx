import React, { useState, useRef, useEffect, memo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useDebounce } from './assistantUtils';
import { searchItems, highlight } from './assistantService';

const HighlightedText = ({ text, query }) => {
  const parts = highlight(text, query);
  return (
    <span>
      {parts.map((p, i) =>
        p.match
          ? <mark key={i} className="bg-yellow-100 text-yellow-800 rounded-sm px-0.5 not-italic font-medium">{p.text}</mark>
          : <span key={i}>{p.text}</span>
      )}
    </span>
  );
};

const AssistantSearch = memo(({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(-1);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 150);
  const results = searchItems(debouncedQuery);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setFocused(-1); }, [debouncedQuery]);

  const handleKey = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, -1)); }
    if (e.key === 'Enter' && focused >= 0) { onNavigate(results[focused].route); setQuery(''); }
  };

  return (
    <div className="px-4 pt-3 pb-2 flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search anything..."
          aria-label="Search dashboard"
          aria-autocomplete="list"
          aria-controls="search-results"
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
        />
      </div>

      {results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="mt-2 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden"
        >
          {results.map((item, i) => (
            <li
              key={item.id}
              role="option"
              aria-selected={focused === i}
              onClick={() => { onNavigate(item.route); setQuery(''); }}
              className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors text-sm ${
                focused === i ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <div>
                <span className="text-gray-900 font-medium">
                  <HighlightedText text={item.label} query={debouncedQuery} />
                </span>
                <span className="ml-2 text-xs text-gray-400">{item.category}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            </li>
          ))}
        </ul>
      )}

      {debouncedQuery.trim() && results.length === 0 && (
        <p className="mt-2 text-xs text-gray-400 text-center py-2">No results for "{debouncedQuery}"</p>
      )}
    </div>
  );
});

AssistantSearch.displayName = 'AssistantSearch';
export default AssistantSearch;
