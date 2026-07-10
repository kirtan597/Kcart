import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { QUICK_ACTIONS } from './assistantData';

const AssistantQuickActions = memo(({ onNavigate }) => (
  <section aria-label="Quick Actions" className="px-4 py-3 flex-shrink-0">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-2">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            onClick={() => onNavigate(action.route)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-start gap-2.5 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black group"
            aria-label={action.label}
          >
            <div className="p-1.5 bg-white rounded-md shadow-sm border border-gray-100 flex-shrink-0 group-hover:border-gray-200 transition-colors">
              <Icon className="w-3.5 h-3.5 text-gray-700" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-800 leading-tight truncate">{action.label}</p>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">{action.desc}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  </section>
));

AssistantQuickActions.displayName = 'AssistantQuickActions';
export default AssistantQuickActions;
