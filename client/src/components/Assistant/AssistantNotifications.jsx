import React, { memo } from 'react';
import { NOTIFICATIONS, NOTIFICATION_COLORS } from './assistantData';

const AssistantNotifications = memo(() => (
  <section aria-label="Notifications" className="px-4 py-3 flex-shrink-0">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
      Recent Activity
    </h3>
    <div className="space-y-1.5">
      {NOTIFICATIONS.map((n) => {
        const Icon = n.icon;
        const colorClass = NOTIFICATION_COLORS[n.type];
        return (
          <div
            key={n.id}
            className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg"
            role="listitem"
          >
            <div className={`p-1.5 rounded-md flex-shrink-0 ${colorClass}`}>
              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            </div>
            <p className="flex-1 text-sm text-gray-700 leading-tight">{n.label}</p>
            <span className="text-[11px] text-gray-400 flex-shrink-0 whitespace-nowrap">{n.time}</span>
          </div>
        );
      })}
    </div>
  </section>
));

AssistantNotifications.displayName = 'AssistantNotifications';
export default AssistantNotifications;
