import React, { useEffect, useRef, useCallback, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { recordPage } from './assistantService';
import AssistantHeader from './AssistantHeader';
import AssistantSearch from './AssistantSearch';
import AssistantQuickActions from './AssistantQuickActions';
import AssistantSuggestions from './AssistantSuggestions';
import AssistantRecentPages from './AssistantRecentPages';
import AssistantNotifications from './AssistantNotifications';
import AssistantHelpCenter from './AssistantHelpCenter';
import AssistantFooter from './AssistantFooter';

const TABS = [
  { id: 'overview',      label: 'Overview'      },
  { id: 'actions',       label: 'Actions'       },
  { id: 'notifications', label: 'Notifications' },
  { id: 'help',          label: 'Help'          },
];

const desktopVariants = {
  hidden:  { opacity: 0, x: 24,  filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)' },
  exit:    { opacity: 0, x: 24,  filter: 'blur(4px)' },
};

const mobileVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0      },
  exit:    { opacity: 0, y: '100%' },
};

const spring = { type: 'spring', stiffness: 380, damping: 32 };

const AssistantPanel = memo(({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [tab, setTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const el = panelRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap  = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first?.focus(); } }
    };
    el.addEventListener('keydown', trap);
    first?.focus();
    return () => el.removeEventListener('keydown', trap);
  }, [isOpen, tab]);

  const handleNavigate = useCallback((route) => {
    const label = route.replace('/', '') || 'Home';
    const name  = label.charAt(0).toUpperCase() + label.slice(1);
    recordPage(name, route);
    navigate(route);
    onClose();
  }, [navigate, onClose]);

  const variants = isMobile ? mobileVariants : desktopVariants;

  const panelClass = isMobile
    ? 'fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl max-h-[85vh]'
    : 'fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-white border-l border-gray-200 shadow-2xl w-[340px]';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="assistant-title"
            className={panelClass}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={spring}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
            )}

            <AssistantHeader onClose={onClose} />

            {/* Tab bar */}
            <div className="flex border-b border-gray-100 px-4 flex-shrink-0" role="tablist">
              {TABS.map(t => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                    tab === t.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-gray-50">
              {tab === 'overview' && (
                <>
                  <AssistantSearch    onNavigate={handleNavigate} />
                  <AssistantRecentPages onNavigate={handleNavigate} />
                  <AssistantSuggestions onNavigate={handleNavigate} />
                </>
              )}
              {tab === 'actions' && (
                <AssistantQuickActions onNavigate={handleNavigate} />
              )}
              {tab === 'notifications' && (
                <AssistantNotifications />
              )}
              {tab === 'help' && (
                <AssistantHelpCenter onNavigate={handleNavigate} />
              )}
            </div>

            <AssistantFooter />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

AssistantPanel.displayName = 'AssistantPanel';
export default AssistantPanel;
