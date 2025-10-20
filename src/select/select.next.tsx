import { useMergeRefs } from '@floating-ui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import * as downshift from 'downshift';
import { ChevronDown } from 'lucide-react';
import { createContext, use } from 'react';
import { createPortal } from 'react-dom';

import { useDropdown } from '../dropdown/dropdown.next';
import { Field, FieldLabel, useFieldId } from '../field/field.next';
import { Extend } from '../utils/types';

type SelectContext<T = unknown> = {
  select: downshift.UseSelectReturnValue<T>;
  dropdown: ReturnType<typeof useDropdown>;
};

const selectContext = createContext<SelectContext<any>>(null as never);

type SelectProps<T> = {
  select: downshift.UseSelectProps<T>;
  dropdown: Parameters<typeof useDropdown>[1];
  root?: HTMLElement | null;
  field?: (select: SelectContext<T>) => Omit<React.ComponentProps<typeof Field>, 'children'>;
  toggleButton: (select: SelectContext<T>) => React.ReactNode;
  menu: (select: SelectContext<T>) => React.ReactNode;
};

export function Select<T>(props: SelectProps<T>) {
  const select = downshift.useSelect(props.select);
  const dropdown = useDropdown(select.isOpen, props.dropdown);

  const context = {
    select,
    dropdown,
  };

  return (
    <selectContext.Provider value={context}>
      <Field
        id={props.select.id}
        label={<FieldLabel {...select.getLabelProps()} />}
        {...props.field?.(context)}
      >
        {props.toggleButton(context)}
        {createPortal(props.menu(context), props.root ?? document.body)}
      </Field>
    </selectContext.Provider>
  );
}

type SelectToggleButtonProps = Extend<
  React.ComponentProps<'div'>,
  {
    size?: 1 | 2 | 3;
    placeholder?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
  }
>;

export function SelectToggleButton(props: SelectToggleButtonProps) {
  const { ref, size, placeholder, icon, disabled, readOnly, invalid, className, children, ...rest } = props;
  const { select, dropdown } = use(selectContext);
  const id = useFieldId();

  const refs = useMergeRefs([dropdown.refs.setReference, ref]);

  return (
    <div
      {...select.getToggleButtonProps({ ref: refs })}
      aria-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      aria-errormessage={invalid ? `${id}-helper-text` : undefined}
      className={SelectToggleButton.className({ size, disabled, readOnly, invalid, className })}
      {...rest}
    >
      {select.selectedItem ? children : placeholder && <div className="text-placeholder">{placeholder}</div>}
      {icon ?? <ChevronDown className={clsx('ml-auto size-4', { '-scale-y-100': select.isOpen })} />}
    </div>
  );
}

SelectToggleButton.className = cva(
  [
    'row w-full items-center gap-2',
    'rounded border -outline-offset-1 transition-colors duration-100',
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
