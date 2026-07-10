import React, { memo } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { HELP_RESOURCES } from './assistantData';

const AssistantHelpCenter = memo(({ onNavigate }) => (
  <section aria-label="Help Center" className="px-4 py-3 flex-shrink-0">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
      Help Center
    </h3>
    <div className="grid grid-cols-2 gap-1.5">
      {HELP_RESOURCES.map((r) => {
        const Icon = r.icon;
        const handleClick = () => {
          if (r.external) { window.open(r.href, '_blank', 'noopener noreferrer'); }
          else if (r.href.startsWith('/')) { onNavigate(r.href); }
        };
        return (
          <button
            key={r.id}
            onClick={handleClick}
            className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black group"
            aria-label={r.label}
          >
            <Icon className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5 group-hover:text-gray-800 transition-colors" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-medium text-gray-800 leading-tight truncate">{r.label}</p>
                {r.external && <ExternalLink className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />}
              </div>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">{r.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  </section>
));

AssistantHelpCenter.displayName = 'AssistantHelpCenter';
export default AssistantHelpCenter;
