import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  FloatingRootContext,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const duration = 140;

const MotionFloatingOverlay = motion.create(FloatingOverlay);

export function Backdrop({
  open,
  onClosed,
  context,
  root,
  className,
  children,
}: {
  open: boolean;
  onClosed?: () => void;
  context: FloatingRootContext;
  root?: HTMLElement;
  className?: string;
  children: React.ReactElement;
}) {
  return (
    <AnimatePresence onExitComplete={onClosed}>
      {open && (
        <FloatingPortal root={root}>
          <MotionFloatingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000 }}
            lockScroll
            className={className}
          >
            <FloatingFocusManager context={context} initialFocus={-1}>
              {children}
            </FloatingFocusManager>
          </MotionFloatingOverlay>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}
