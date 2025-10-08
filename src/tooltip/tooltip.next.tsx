import { FloatingArrow, FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { useState } from 'react';

import { UseTooltipProps, useTooltip } from './use-tooltip';

type TooltipOwnProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
  content: React.ReactNode;
  trigger: (props: Record<string, unknown>) => React.ReactNode;
};

type TooltipProps = Omit<UseTooltipProps, 'open' | 'setOpen'> & TooltipOwnProps;

export function Tooltip({ content, className, trigger, ...props }: TooltipProps) {
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
  return <div className="text-xs font-bold text-dim uppercase">{title}</div>;
}
