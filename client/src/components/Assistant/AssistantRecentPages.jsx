import React, { memo, useMemo } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { getRecentPages } from './assistantService';

const formatTime = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const AssistantRecentPages = memo(({ onNavigate }) => {
  const pages = useMemo(() => getRecentPages(), []);
  if (!pages.length) return null;

  return (
    <section aria-label="Recently Visited" className="px-4 py-3 flex-shrink-0">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        Continue where you left off
      </h3>
      <div className="space-y-0.5">
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => onNavigate(page.route)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black group"
            aria-label={`Go to ${page.name}`}
          >
            <Clock className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <span className="flex-1 text-sm text-gray-700 font-medium truncate">{page.name}</span>
            <span className="text-[11px] text-gray-400 flex-shrink-0">{formatTime(page.ts)}</span>
            <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
});

AssistantRecentPages.displayName = 'AssistantRecentPages';
export default AssistantRecentPages;
