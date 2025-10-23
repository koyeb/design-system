import {
  ElementRects,
  Elements,
  ReferenceType,
  UseFloatingOptions,
  UseFloatingReturn,
  UseTransitionStylesProps,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';
import { cva } from 'class-variance-authority';

import { Extend } from '../utils/types';

export type UseDropdownProps = Partial<{
  floating: UseFloatingOptions;
  transition: UseTransitionStylesProps;
  offset: number;
  flip: boolean;
  matchReferenceSize: boolean;
}>;

export type UseDropdown = UseFloatingReturn<ReferenceType> & {
  transition: { styles: React.CSSProperties; isMounted: boolean };
};

export function useDropdown(open: boolean, props: UseDropdownProps = {}): UseDropdown {
  const floating = useFloating({
    open,
    whileElementsMounted: autoUpdate,
    middleware: [
      props.offset !== undefined && offset(props.offset),
      props.flip && flip(),
      props.matchReferenceSize && size({ apply: applyMatchReferenceSize }),
    ],
    ...props.floating,
  });

  const transition = useTransitionStyles(floating.context, {
    duration: 100,
    ...props.transition,
  });

  return {
    ...floating,
    transition,
  };
}

function applyMatchReferenceSize({ rects, elements }: { rects: ElementRects; elements: Elements }) {
  Object.assign(elements.floating.style, {
    width: `${rects.reference.width}px`,
  });
}

type DropdownProps = Extend<
  React.ComponentProps<'div'>,
  {
    dropdown: ReturnType<typeof useDropdown>;
    onClosed?: () => void;
  }
>;

export function Dropdown({ ref, dropdown, onClosed, style, className, children, ...props }: DropdownProps) {
  const mergedRefs = useMergeRefs([dropdown.refs.setFloating, ref]);

  const onTransitionEnd = () => {
    if (!dropdown.context.open) {
      onClosed?.();
    }
  };

  return (
    <div
      ref={mergedRefs}
      style={{ ...dropdown.floatingStyles, ...dropdown.transition.styles, ...style }}
      className={Dropdown.className({ hidden: !dropdown.transition.isMounted, className })}
      onTransitionEnd={onTransitionEnd}
      onTransitionCancel={onTransitionEnd}
      {...props}
    >
      {children}
    </div>
  );
}

Dropdown.className = cva('z-50 rounded-md border bg-neutral shadow-md', {
  variants: {
    hidden: {
      true: 'hidden',
    },
  },
});

export function Menu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul {...props} className={Menu.className({ className })} />;
}

Menu.className = cva('p-1');

type MenuItemProps = Extend<
  React.ComponentProps<'li'>,
  {
    highlighted?: boolean;
  }
>;

export function MenuItem({ highlighted, className, ...props }: MenuItemProps) {
  return <li {...props} className={MenuItem.className({ highlighted, className })} />;
}

MenuItem.className = cva('cursor-pointer rounded-md px-2 py-1 aria-disabled:pointer-events-none', {
  variants: {
    highlighted: {
      true: 'bg-muted',
    },
  },
});
