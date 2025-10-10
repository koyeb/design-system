import clsx from 'clsx';

import { Field, FieldHelperText, FieldLabel } from '../field/field';
import { Extend } from '../utils/types';
import { useId } from '../utils/use-id';

type InputOwnProps = {
  size?: 1 | 2 | 3;
  label?: React.ReactNode;
  labelPosition?: 'top' | 'left';
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
  inputBoxClassName?: string;
  inputClassName?: string;
};

type InputProps = Extend<React.ComponentProps<'input'>, InputOwnProps>;

export function Input({
  size,
  label,
  labelPosition,
  helperText,
  error,
  invalid = Boolean(error),
  className,
  inputBoxClassName,
  inputClassName,
  ...props
}: InputProps) {
  const id = useId(props.id);
  const helperTextId = `${id}-helper-text`;

  return (
    <Field
      label={<FieldLabel htmlFor={id}>{label}</FieldLabel>}
      labelPosition={labelPosition}
      helperText={
        <FieldHelperText id={helperTextId} invalid={invalid}>
          {error ?? helperText}
        </FieldHelperText>
      }
      className={className}
    >
      <InputBox
        id={id}
        size={size}
        boxClassName={inputBoxClassName}
        className={inputClassName}
        aria-invalid={invalid}
        aria-errormessage={helperTextId}
        {...props}
      />
    </Field>
  );
}

type InputBoxOwnProps = {
  boxRef?: React.Ref<HTMLDivElement>;
  boxClassName?: string;
  size?: 1 | 2 | 3;
  placeholder?: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
};

type InputBoxProps = Extend<React.ComponentProps<'input'>, InputBoxOwnProps>;

export function InputBox({
  boxRef,
  boxClassName,
  size = 2,
  placeholder,
  value,
  min,
  max,
  step,
  start,
  end,
  id,
  className,
  ...props
}: InputBoxProps) {
  return (
    <div
      ref={boxRef}
      className={clsx(
        'row w-full justify-stretch rounded border -outline-offset-1',
        props.disabled || props.readOnly ? 'bg-muted' : 'bg-neutral focusable-within',
        props.disabled && 'opacity-50',
        props['aria-invalid'] && 'border-red outline-red',
        {
          'min-h-6': size === 1,
          'min-h-8': size === 2,
          'min-h-10': size === 3,
        },
        boxClassName,
      )}
    >
      {start}

      <input
        id={id}
        className={clsx(
          'w-full min-w-0 flex-1 rounded bg-inherit px-2 outline-none',
          'placeholder:text-placeholder',
          start && 'rounded-s-none',
          end && 'rounded-e-none',
          className,
        )}
        value={Number.isNaN(value) ? '' : value}
        min={Number.isNaN(min) ? undefined : min}
        max={Number.isNaN(max) ? undefined : max}
        step={Number.isNaN(step) ? undefined : step}
        placeholder={placeholder}
        {...props}
      />

      {end}
    </div>
  );
}

type InputStartProps = {
  className?: string;
  children: React.ReactNode;
};

export function InputStart({ className, children }: InputStartProps) {
  return (
    <span className={clsx('row items-center rounded-s border-e bg-muted px-1 text-dim', className)}>
      {children}
    </span>
  );
}

type InputEndProps = {
  className?: string;
  children: React.ReactNode;
};

export function InputEnd({ className, children }: InputEndProps) {
  return (
    <span className={clsx('row items-center rounded-e border-s bg-muted px-1 text-dim', className)}>
      {children}
    </span>
  );
}
