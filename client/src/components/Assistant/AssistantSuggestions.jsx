import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getSuggestions } from './assistantService';

const AssistantSuggestions = memo(({ onNavigate }) => {
  const { pathname } = useLocation();
  const suggestions = getSuggestions(pathname);

  return (
    <section aria-label="Contextual Suggestions" className="px-4 py-3 flex-shrink-0">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
        Suggested for this page
      </h3>
      <div className="space-y-1">
        {suggestions.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.route)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black group"
              aria-label={s.label}
            >
              <div className="p-1.5 bg-gray-100 rounded-md flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                <Icon className="w-3.5 h-3.5 text-gray-600" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">{s.label}</p>
                <p className="text-xs text-gray-400 leading-tight">{s.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 group-hover:text-gray-500 transition-colors" />
            </button>
          );
        })}
      </div>
    </section>
  );
});

AssistantSuggestions.displayName = 'AssistantSuggestions';
export default AssistantSuggestions;
