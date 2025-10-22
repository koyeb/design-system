import { useMergeRefs } from '@floating-ui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import * as downshift from 'downshift';
import { ChevronDown } from 'lucide-react';

import { UseDropdown } from '../dropdown/dropdown.next';
import { useFieldId } from '../field/field.next';
import { Extend } from '../utils/types';

type SelectToggleButtonProps<T> = Extend<
  React.ComponentProps<'div'>,
  {
    select: downshift.UseSelectReturnValue<T>;
    dropdown: UseDropdown;
    size?: 1 | 2 | 3;
    placeholder?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
  }
>;

export function SelectToggleButton<T>(props: SelectToggleButtonProps<T>) {
  const {
    select,
    dropdown,
    ref,
    size,
    placeholder,
    icon,
    disabled,
    readOnly,
    invalid,
    className,
    children,
    ...rest
  } = props;

  const mergedRefs = useMergeRefs([dropdown.refs.setReference, ref]);
  const id = useFieldId();

  return (
    <div
      {...select.getToggleButtonProps({ ref: mergedRefs, ...rest })}
      aria-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      aria-errormessage={invalid ? `${id}-helper-text` : undefined}
      className={toggleButton({ size, disabled, readOnly, invalid, className })}
    >
      <div className="grow">
        {children ?? (placeholder && <div className="text-placeholder">{placeholder}</div>)}
      </div>

      {icon ?? (
        <div>
          <ChevronDown className={clsx('size-4', select.isOpen && '-scale-y-100')} />
        </div>
      )}
    </div>
  );
}

const toggleButton = cva(
  [
    'row w-full items-center gap-2',
    'bg-neutral rounded border -outline-offset-1 transition-colors duration-100',
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
