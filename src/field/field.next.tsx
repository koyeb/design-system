import clsx from 'clsx';
import { createContext, use } from 'react';

import { useId } from '../utils/use-id';

const fieldIdContext = createContext<string | undefined>(undefined);

export function useFieldId() {
  return use(fieldIdContext);
}

type FieldProps = {
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Field({ ref, id: idProp, label, helperText, className, children }: FieldProps) {
  const id = useId(idProp);

  return (
    <fieldIdContext.Provider value={id}>
      <div ref={ref} className={clsx('gap-y-1.5 col items-start', className)}>
        {label}
        {children}
        {helperText}
      </div>
    </fieldIdContext.Provider>
  );
}

type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel(props: FieldLabelProps) {
  const id = useFieldId();

  if (!props.children) {
    return null;
  }

  return <label htmlFor={id} {...props} />;
}

type FieldHelperTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  invalid?: boolean;
};

export function FieldHelperText({ invalid, className, children, ...props }: FieldHelperTextProps) {
  const fieldId = useFieldId();

  if (!children) {
    return null;
  }

  return (
    <span
      id={`${fieldId}-helper-text`}
      className={clsx('col-span-2 text-xs text-dim', invalid && 'text-red', className)}
      {...props}
    >
      {children}
    </span>
  );
}
