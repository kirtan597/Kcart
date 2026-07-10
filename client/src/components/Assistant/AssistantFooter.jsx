import React, { memo } from 'react';

const AssistantFooter = memo(() => (
  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
    <span className="text-[11px] text-gray-400">Kcart Smart Help</span>
    <div className="flex items-center gap-2 text-[11px] text-gray-400">
      <span>
        <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono text-[10px]">↑↓</kbd>
        {' '}navigate
      </span>
      <span>
        <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono text-[10px]">↵</kbd>
        {' '}select
      </span>
      <span>
        <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono text-[10px]">Esc</kbd>
        {' '}close
      </span>
    </div>
  </div>
));

AssistantFooter.displayName = 'AssistantFooter';
export default AssistantFooter;
