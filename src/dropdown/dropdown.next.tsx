import {
  ElementRects,
  Elements,
  UseFloatingOptions,
  UseTransitionStylesProps,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import { cva } from 'class-variance-authority';

import { Extend } from '../utils/types';

export function useDropdown(
  open: boolean,
  props: {
    floating?: UseFloatingOptions;
    transition?: UseTransitionStylesProps;
    offset?: number;
    flip?: boolean;
    matchReferenceSize?: boolean;
  } = {},
): ReturnType<typeof useFloating> & {
  transition: { styles: React.CSSProperties; isMounted: boolean };
} {
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

type DropdownProps = {
  dropdown: ReturnType<typeof useDropdown>;
  className?: string;
  children: React.ReactNode;
};

export function Dropdown({ dropdown, className, children }: DropdownProps) {
  return (
    <div
      ref={dropdown.refs.setFloating}
      className={Dropdown.className({ hidden: !dropdown.transition.isMounted, className })}
      style={{ ...dropdown.floatingStyles, ...dropdown.transition.styles }}
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

MenuItem.className = cva(
  'row cursor-pointer items-center rounded-md px-2 py-1 aria-disabled:cursor-default',
  {
    variants: {
      highlighted: {
        true: 'bg-muted',
      },
    },
  },
);
