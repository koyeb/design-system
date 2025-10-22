import { cva } from 'class-variance-authority';

import { Field, useFieldId } from '../field/field.next';
import { Extend } from '../utils/types';

type InputProps = Extend<
  InputBoxProps,
  {
    field?: Omit<React.ComponentProps<typeof Field>, 'children'>;
  }
>;

export function Input({ field, className, ...props }: InputProps) {
  return (
    <Field id={props.id} className={className} {...field}>
      <InputBox {...props} />
    </Field>
  );
}

type InputBoxProps = Extend<
  React.ComponentProps<'input'>,
  {
    size?: 1 | 2 | 3;
    disabled?: boolean;
    invalid?: boolean;
    placeholder?: string;
    start?: React.ReactNode;
    end?: React.ReactNode;
    boxRef?: React.Ref<HTMLDivElement>;
    inputClassName?: string;
  }
>;

export function InputBox({
  size,
  disabled,
  readOnly,
  invalid,
  placeholder,
  start,
  end,
  boxRef,
  className,
  inputClassName,
  ...props
}: InputBoxProps) {
  const id = useFieldId();

  return (
    <div ref={boxRef} className={InputBox.className({ size, disabled, readOnly, invalid, className })}>
      {start}

      <input
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        aria-errormessage={invalid ? `${id}-helper-text` : undefined}
        id={id}
        className={InputBox.inputClassName({ size, className: inputClassName })}
        {...props}
      />

      {end}
    </div>
  );
}

InputBox.className = cva(
  ['row w-full justify-stretch rounded border -outline-offset-1 focusable-within', 'peer'],
  {
    variants: {
      size: {
        1: 'min-h-6',
        2: 'min-h-8',
        3: 'min-h-10',
      },
      disabled: {
        true: 'bg-muted pointer-events-none',
        false: 'bg-neutral',
      },
      readOnly: {
        true: 'pointer-events-none',
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

InputBox.inputClassName = cva(
  [
    'w-full min-w-0 flex-1 rounded bg-inherit outline-none truncate placeholder:text-placeholder',
    'disabled:placeholder:text-placeholder/50 disabled:text-default/50',
  ],
  {
    variants: {
      size: {
        1: 'px-1',
        2: 'px-2',
        3: 'px-3',
      },
    },
    defaultVariants: {
      size: 2,
    },
  },
);

type InputStartProps = {
  background?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function InputStart({ background, className, children }: InputStartProps) {
  return <span className={inputStart({ background, className })}>{children}</span>;
}

const inputStart = cva('row items-center', {
  variants: {
    background: {
      true: 'rounded-s border-e bg-muted text-dim px-1',
      false: 'ps-2',
    },
  },
  defaultVariants: {
    background: true,
  },
});

type InputEndProps = {
  background?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function InputEnd({ background, className, children }: InputEndProps) {
  return <span className={inputEnd({ background, className })}>{children}</span>;
}

const inputEnd = cva('row items-center', {
  variants: {
    background: {
      true: 'rounded-e border-s bg-muted text-dim px-1',
      false: 'pe-2',
    },
  },
  defaultVariants: {
    background: true,
  },
});
