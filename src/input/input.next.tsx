import { cva } from 'class-variance-authority';

import { useFieldId } from '../field/field.next';
import { Extend } from '../utils/types';

type InputProps = Extend<
  React.ComponentProps<'input'>,
  {
    size?: 1 | 2 | 3;
    invalid?: boolean;
    start?: React.ReactNode;
    end?: React.ReactNode;
    root?: React.ComponentProps<'div'>;
  }
>;

export function Input({
  size,
  disabled,
  readOnly,
  invalid,
  start,
  end,
  className,
  root,
  ...props
}: InputProps) {
  const id = useFieldId();

  return (
    <div
      {...root}
      className={classes.root({ size, disabled, readOnly, invalid, className: root?.className })}
    >
      {start}

      <input
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        aria-errormessage={invalid ? `${id}-helper-text` : undefined}
        className={classes.input({ size, className })}
        {...props}
      />

      {end}
    </div>
  );
}

type InputStartProps = {
  background?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function InputStart({ background, className, children }: InputStartProps) {
  return <span className={classes.start({ background, className })}>{children}</span>;
}

type InputEndProps = {
  background?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function InputEnd({ background, className, children }: InputEndProps) {
  return <span className={classes.end({ background, className })}>{children}</span>;
}

const classes = {
  root: cva(['row w-full justify-stretch rounded border -outline-offset-1 focusable-within'], {
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
      disabled: false,
    },
  }),

  input: cva(
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
  ),

  start: cva('row items-center', {
    variants: {
      background: {
        true: 'rounded-s border-e bg-muted text-dim px-1',
        false: 'ps-2',
      },
    },
    defaultVariants: {
      background: true,
    },
  }),

  end: cva('row items-center', {
    variants: {
      background: {
        true: 'rounded-e border-s bg-muted text-dim px-1',
        false: 'pe-2',
      },
    },
    defaultVariants: {
      background: true,
    },
  }),
};
