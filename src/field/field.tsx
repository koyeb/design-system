import clsx from 'clsx';

type FieldProps = {
  ref?: React.Ref<HTMLDivElement>;
  label?: React.ReactNode;
  labelPosition?: 'top' | 'left';
  helperText?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Field({ ref, label, labelPosition = 'top', helperText, className, children }: FieldProps) {
  return (
    <div
      ref={ref}
      className={clsx(
        'gap-x-2 gap-y-1.5',
        {
          'col items-start': labelPosition === 'top',
          'grid grid-cols-[auto_1fr] items-center': labelPosition === 'left',
        },
        className,
      )}
    >
      {label}
      {children}
      {helperText}
    </div>
  );
}

type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel(props: FieldLabelProps) {
  if (!props.children) {
    return null;
  }

  return <label {...props} />;
}

type FieldHelperTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  invalid?: boolean;
};

export function FieldHelperText({ className, children, invalid, ...props }: FieldHelperTextProps) {
  if (!children) {
    return null;
  }

  return (
    <span className={clsx('col-span-2 text-xs text-dim', invalid && 'text-red', className)} {...props}>
      {children}
    </span>
  );
}
