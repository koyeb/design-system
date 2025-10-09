import {
  FloatingArrow,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Backdrop } from '../backdrop/backdrop';
import { UseTooltipProps, useTooltip } from './use-tooltip';

type TooltipOwnProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  root?: HTMLElement;
  className?: string;
  content: React.ReactNode;
  trigger: (props: Record<string, unknown>) => React.ReactNode;
  closeButton?: (onClick: () => void) => React.ReactNode;
};

type TooltipProps = Omit<UseTooltipProps, 'open' | 'setOpen'> & TooltipOwnProps;

export function TooltipMobile({ content, root, trigger, closeButton, className, ...props }: TooltipProps) {
  const [openState, setOpenState] = useState(false);
  const [open, setOpen] = [props.open ?? openState, props.setOpen ?? setOpenState];

  const { refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context, { role: 'tooltip' });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  return (
    <>
      {trigger({ onClick: () => setOpen(true) })}

      <Backdrop
        open={open}
        context={context}
        root={root}
        className="z-40 overflow-hidden! bg-black/5 p-2 backdrop-blur-xs"
      >
        <motion.div
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0)' }}
          exit={{ transform: 'translateY(100%)' }}
          ref={refs.setFloating}
          className={clsx('absolute inset-x-0 bottom-0 rounded-t-2xl bg-neutral px-4 pt-4 pb-12', className)}
          {...getFloatingProps()}
        >
          {content}
          {closeButton?.(() => setOpen(false))}
        </motion.div>
      </Backdrop>
    </>
  );
}

export function TooltipDesktop({ content, className, trigger, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { getReferenceProps, setReference, ...tooltip } = useTooltip({
    open,
    setOpen,
    ...props,
  });

  const reference = trigger(getReferenceProps({ ref: setReference }));

  if (!content) {
    return reference;
  }

  return (
    <>
      {reference}

      <TooltipElement {...tooltip} className={className}>
        {content}
      </TooltipElement>
    </>
  );
}

type TooltipElementProps = Omit<ReturnType<typeof useTooltip>, 'setReference' | 'getReferenceProps'> & {
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TooltipElement({
  context,
  styles,
  isMounted,
  arrowSize,
  arrowElement,
  arrow,
  setFloating,
  getFloatingProps,
  className,
  children,
}: TooltipElementProps) {
  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        style={styles}
        className={clsx('z-50 rounded-md border bg-neutral p-3 drop-shadow-md', className)}
        {...getFloatingProps({ ref: setFloating })}
      >
        {children}
        {arrow && (
          <FloatingArrow ref={arrowElement} context={context} height={arrowSize} className="fill-neutral" />
        )}
      </div>
    </FloatingPortal>
  );
}

export function TooltipTitle({ title }: { title: React.ReactNode }) {
  return <div className="text-base font-bold md:text-xs md:text-dim md:uppercase">{title}</div>;
}
