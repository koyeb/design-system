import {
  ElementRects,
  Elements,
  Placement,
  UseFloatingOptions,
  UseFloatingReturn,
  UseTransitionStylesProps,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import * as downshift from 'downshift';
import { CSSProperties, createContext, use } from 'react';
import { createPortal } from 'react-dom';

import { Field } from '../field/field';
import { Extend } from '../utils/types';

type FloatingTransition = { isMounted: boolean; styles: CSSProperties };

type SelectContext<T = unknown> = downshift.UseSelectReturnValue<T> & {
  floating: UseFloatingReturn;
  transition: FloatingTransition;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectContext = createContext<SelectContext<any> | null>(null);

export const Select = {
  stateChangeTypes: downshift.useSelect.stateChangeTypes,
  context: selectContext,
  Provider: selectContext.Provider,
  useSelect,
  useSelectContext,
  Root,
  ToggleButton,
  Dropdown,
  Menu,
  MenuItem,
  DropdownMenu,
};

type UseSelectProps<T> = {
  items?: T[];
  select?: Omit<downshift.UseSelectProps<T>, 'items'>;
  floating?: UseFloatingOptions;
  transition?: UseTransitionStylesProps;
  placement?: Placement;
  offset?: number;
  flip?: boolean;
  matchReferenceSize?: boolean;
};

function useSelect<T>({
  items,
  select: selectProps,
  floating: floatingProps,
  transition: transitionProps,
  ...props
}: UseSelectProps<T>): SelectContext<T> {
  const select = downshift.useSelect({ items: items ?? [], ...selectProps });

  const floating = useFloating({
    whileElementsMounted: autoUpdate,
    open: select.isOpen,
    placement: props.placement,
    middleware: [
      props.offset !== undefined && offset(props.offset),
      props.flip && flip(),
      props.matchReferenceSize && size({ apply: applyMatchReferenceSize }),
    ],
    ...floatingProps,
  });

  const transition = useTransitionStyles(floating.context, {
    duration: 120,
    ...transitionProps,
  });

  return {
    ...select,
    floating,
    transition,
  };
}

function applyMatchReferenceSize({ rects, elements }: { rects: ElementRects; elements: Elements }) {
  Object.assign(elements.floating.style, {
    width: `${rects.reference.width}px`,
  });
}

function useSelectContext() {
  const context = use(selectContext);

  if (context === null) {
    throw new Error(`Missing select provider`);
  }

  return context;
}

type RootProps<T> = Extend<
  Extend<Omit<React.ComponentProps<typeof Field>, 'children'>, UseSelectProps<T>>,
  {
    toggleButton: (props: Record<string, unknown>, select: SelectContext<T>) => React.ReactNode;
    menu: (select: SelectContext<T>) => React.ReactNode;
    root?: HTMLElement;
  }
>;

function Root<T>({
  toggleButton,
  menu,
  root,
  ref,
  label,
  labelPosition,
  helperText,
  className,
  ...props
}: RootProps<T>) {
  const value = Select.useSelect(props);

  return (
    <Select.Provider value={value}>
      {toggleButton({ ref: value.floating.refs.setReference }, value)}
      {createPortal(menu(value), root ?? document.body)}
    </Select.Provider>
  );
}

type ToggleButtonProps = Extend<
  React.ComponentProps<'div'>,
  {
    size: 1 | 2 | 3;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
  }
>;

function ToggleButton({ disabled, invalid, placeholder, children, ...props }: ToggleButtonProps) {
  const select = useSelectContext();

  return (
    <div
      aria-invalid={invalid}
      aria-disabled={disabled}
      className={ToggleButton.className({ ...props, className: props.className })}
      {...select.getToggleButtonProps(props)}
    >
      {select.selectedItem ? children : <div className="text-placeholder">{placeholder}</div>}
    </div>
  );
}

ToggleButton.className = cva(
  [
    'row w-full items-center',
    'rounded border -outline-offset-1 transition-colors',
    'focus:focused cursor-pointer',
  ],
  {
    variants: {
      size: {
        1: 'min-h-6 px-1.5',
        2: 'min-h-8 px-2',
        3: 'min-h-10 px-3',
      },
      disabled: {
        true: 'bg-muted text-dim pointer-events-none',
        false: 'bg-neutral',
      },
      readOnly: {
        true: 'pointer-events-none',
        false: '',
      },
      invalid: {
        true: 'border-red outline-red',
      },
    },
    defaultVariants: {
      size: 2,
    },
  },
);

function Dropdown({ className, ...props }: React.ComponentProps<'div'>) {
  const { floating, transition } = useSelectContext();

  return (
    <div
      ref={floating.refs.setFloating}
      style={{ ...floating.floatingStyles, ...transition.styles }}
      className={clsx(
        'z-50 rounded-md border bg-neutral shadow-md',
        { hidden: !transition.isMounted },
        className,
      )}
      {...props}
    />
  );
}

function Menu({ className, ...props }: React.ComponentProps<'ul'>) {
  const select = useSelectContext();

  return <ul {...select.getMenuProps(props)} className={clsx('p-1', className)} />;
}

function MenuItem({ className, ...props }: { item: unknown; index: number } & React.ComponentProps<'li'>) {
  const select = useSelectContext();

  return (
    <li
      {...select.getItemProps(props)}
      className={clsx(
        'row cursor-pointer items-center rounded-md px-2 py-1 aria-disabled:cursor-default',
        { 'bg-muted': select.highlightedIndex === props.index },
        className,
      )}
    />
  );
}

type DropdownMenuProps<T> = {
  items: T[];
  getKey: (item: T) => React.Key;
  renderItem: (item: T) => React.ReactNode;
};

function DropdownMenu<T>({ items, getKey, renderItem }: DropdownMenuProps<T>) {
  return (
    <Dropdown>
      <Menu>
        {items.map((item, index) => (
          <MenuItem key={getKey(item)} item={item} index={index}>
            {renderItem(item)}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
