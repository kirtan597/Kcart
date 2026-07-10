import React, { memo } from 'react';
import { X } from 'lucide-react';

const AssistantHeader = memo(({ onClose }) => (
  <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
    <div>
      <h2 id="assistant-title" className="text-base font-semibold text-gray-900 leading-tight">
        Smart Help
      </h2>
      <p className="text-xs text-gray-400 mt-0.5">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[10px]">?</kbd>
        {' '}or{' '}
        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[10px]">Ctrl K</kbd>
        {' '}to toggle
      </p>
    </div>
    <button
      onClick={onClose}
      aria-label="Close Smart Help"
      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
));

AssistantHeader.displayName = 'AssistantHeader';
export default AssistantHeader;
