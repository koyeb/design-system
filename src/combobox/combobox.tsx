import {
  ElementRects,
  Elements,
  FloatingPortal,
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
import clsx from 'clsx';
import * as downshift from 'downshift';
import { ChevronsUpDownIcon } from 'lucide-react';
import { CSSProperties, createContext, use } from 'react';

import { Field } from '../field/field';
import { InputBox } from '../input/input';

type FloatingTransition = { isMounted: boolean; styles: CSSProperties };

type ComboboxContext<T = unknown> = downshift.UseComboboxReturnValue<T> & {
  floating: UseFloatingReturn;
  transition: FloatingTransition;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const comboboxContext = createContext<ComboboxContext<any> | null>(null);

export const Combobox = {
  stateChangeTypes: downshift.useCombobox.stateChangeTypes,
  context: comboboxContext,
  Provider: comboboxContext.Provider,
  useCombobox,
  useComboboxContext,
  Root,
  Input,
  Dropdown,
  Menu,
  MenuItem,
  DropdownMenu,
};

type UseComboboxProps<T> = {
  items?: T[];
  combobox: Omit<downshift.UseComboboxProps<T>, 'items'>;
  floating?: UseFloatingOptions;
  transition?: UseTransitionStylesProps;
  placement?: Placement;
  offset?: number;
  flip?: boolean;
  matchReferenceSize?: boolean;
};

function useCombobox<T>({
  items,
  combobox: comboboxProps,
  floating: floatingProps,
  transition: transitionProps,
  ...props
}: UseComboboxProps<T>): ComboboxContext<T> {
  const combobox = downshift.useCombobox({ items: items ?? [], ...comboboxProps });

  const floating = useFloating({
    whileElementsMounted: autoUpdate,
    open: combobox.isOpen,
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
    ...combobox,
    floating,
    transition,
  };
}

function applyMatchReferenceSize({ rects, elements }: { rects: ElementRects; elements: Elements }) {
  Object.assign(elements.floating.style, {
    width: `${rects.reference.width}px`,
  });
}

function useComboboxContext() {
  const context = use(comboboxContext);

  if (context === null) {
    throw new Error(`Missing combobox provider`);
  }

  return context;
}

type ComboboxProps<T> = UseComboboxProps<T> & {
  input?: React.ReactNode;
  root?: HTMLElement;
  children: React.ReactNode;
};

function Root<T>({ input = <Combobox.Input />, root, children, ...props }: ComboboxProps<T>) {
  const value = Combobox.useCombobox(props);

  return (
    <Combobox.Provider value={value}>
      <Field ref={value.floating.refs.setReference}>{input}</Field>
      <FloatingPortal root={root}>{children}</FloatingPortal>
    </Combobox.Provider>
  );
}

function Input({ start, ...props }: React.ComponentProps<typeof InputBox>) {
  const combobox = useComboboxContext();

  return (
    <InputBox
      {...combobox.getInputProps(props)}
      start={start}
      end={
        <button {...combobox.getToggleButtonProps()} className="px-2">
          <ChevronsUpDownIcon className="size-4" />
        </button>
      }
    />
  );
}

function Dropdown({ className, ...props }: React.ComponentProps<'div'>) {
  const { floating, transition } = useComboboxContext();

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
  const combobox = useComboboxContext();

  return <ul {...combobox.getMenuProps(props)} className={clsx('p-1', className)} />;
}

function MenuItem({ className, ...props }: { item: unknown } & React.ComponentProps<'li'>) {
  const combobox = useComboboxContext();

  return (
    <li
      {...combobox.getItemProps(props)}
      className={clsx(
        'row cursor-pointer items-center rounded-md px-2 py-1 aria-disabled:cursor-default aria-selected:bg-muted',
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
        {items.map((item) => (
          <MenuItem key={getKey(item)} item={item}>
            {renderItem(item)}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
