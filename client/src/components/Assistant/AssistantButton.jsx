import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { CircleHelp } from 'lucide-react';

const AssistantButton = memo(({ onClick, isOpen }) => (
  <motion.button
    onClick={onClick}
    aria-label={isOpen ? 'Close Smart Help' : 'Open Smart Help (? or Ctrl+K)'}
    aria-expanded={isOpen}
    aria-haspopup="dialog"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.94 }}
    className={`
      fixed bottom-8 right-8 z-50
      w-14 h-14 sm:w-16 sm:h-16
      rounded-full
      flex items-center justify-center
      bg-white/80 backdrop-blur-md
      border border-gray-200
      shadow-lg shadow-black/10
      hover:shadow-xl hover:shadow-black/15
      focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
      transition-colors duration-200
      ${isOpen ? 'bg-black text-white border-black' : 'text-gray-800 hover:bg-white'}
    `}
    style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
  >
    <CircleHelp className="w-6 h-6" strokeWidth={1.75} />
  </motion.button>
));

AssistantButton.displayName = 'AssistantButton';
export default AssistantButton;
