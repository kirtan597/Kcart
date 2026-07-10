import React, { useState, useCallback, lazy, Suspense } from 'react';
import AssistantButton from './AssistantButton';
import { useAssistantKeyboard } from './assistantUtils';

const AssistantPanel = lazy(() => import('./AssistantPanel'));

const SmartAssistant = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(o => !o), []);

  useAssistantKeyboard(open, setOpen);

  return (
    <>
      <AssistantButton onClick={toggle} isOpen={open} />
      {open && (
        <Suspense fallback={null}>
          <AssistantPanel isOpen={open} onClose={close} />
        </Suspense>
      )}
    </>
  );
};

export default SmartAssistant;
