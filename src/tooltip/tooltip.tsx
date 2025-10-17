import { FloatingArrow, FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Backdrop } from '../backdrop/backdrop';
import { useBreakpoint } from '../utils/media-query';
import { UseTooltipProps, useTooltip } from './use-tooltip';

type TooltipOwnProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  forceDesktop?: boolean;
  root?: HTMLElement | null;
  className?: string;
  content?: ({ onClose }: { onClose: () => void }) => React.ReactNode;
  trigger: (props: Record<string, unknown>) => React.ReactNode;
};

type TooltipProps = Omit<UseTooltipProps, 'open' | 'setOpen'> & TooltipOwnProps;

export function Tooltip({ content, trigger, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { getReferenceProps, setReference, ...tooltip } = useTooltip({
    open,
    setOpen,
    ...props,
  });

  return (
    <>
      {trigger(getReferenceProps({ ref: setReference }))}

      {content && (
        <TooltipElement {...tooltip} {...props}>
          {content({ onClose: () => tooltip.context.onOpenChange(false) })}
        </TooltipElement>
      )}
    </>
  );
}

type TooltipElementProps = Omit<ReturnType<typeof useTooltip>, 'setReference' | 'getReferenceProps'> & {
  root?: HTMLElement | null;
  arrow?: boolean;
  forceDesktop?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TooltipElement(props: TooltipElementProps) {
  const { context, forceDesktop, isMounted, arrowSize, arrowElement, arrow, children } = props;

  const mobile = !useBreakpoint('sm');
  const Container = mobile && !forceDesktop ? ContainerMobile : ContainerDesktop;

  if (!isMounted) {
    return null;
  }

  return (
    <Container {...props}>
      {children}

      {arrow && (
        <FloatingArrow ref={arrowElement} context={context} height={arrowSize} className="fill-neutral" />
      )}
    </Container>
  );
}

function ContainerMobile(props: TooltipElementProps) {
  const { context, setFloating, getFloatingProps, root, className, children } = props;

  return (
    <Backdrop context={context} root={root} className="z-40 overflow-hidden! bg-black/5 p-2 backdrop-blur-xs">
      <motion.div
        initial={{ transform: 'translateY(100%)' }}
        animate={{ transform: 'translateY(0)' }}
        exit={{ transform: 'translateY(100%)' }}
        className={clsx('absolute inset-x-0 bottom-0 rounded-t-2xl bg-neutral p-4', className)}
        {...getFloatingProps({ ref: setFloating })}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}

function ContainerDesktop(props: TooltipElementProps) {
  const { setFloating, getFloatingProps, root, className, children } = props;

  return (
    <FloatingPortal root={root}>
      <div
        className={clsx('z-50 rounded-md border bg-neutral p-3 drop-shadow-md', className)}
        style={props.styles}
        {...getFloatingProps({ ref: setFloating })}
      >
        {children}
      </div>
    </FloatingPortal>
  );
}

export function TooltipTitle({ title }: { title: React.ReactNode }) {
  return <div className="text-base font-bold md:text-xs md:text-dim md:uppercase">{title}</div>;
}
