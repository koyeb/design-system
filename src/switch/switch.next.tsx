import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import { FieldLabel, useFieldId } from '../next';

type SwitchProps = React.ComponentProps<'input'>;

export function SwitchLabel({
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof FieldLabel> & { disabled?: boolean }) {
  return <FieldLabel className={label({ disabled, className })} {...props} />;
}

const label = cva('inline-flex flex-row items-center gap-2 rounded focusable-within outline-offset-4', {
  variants: {
    disabled: {
      true: 'text-dim',
      false: 'cursor-pointer',
    },
  },
});

export function Switch({ className, ...props }: SwitchProps) {
  const id = useFieldId();

  return (
    <div className="row h-8 items-center">
      <input
        id={id}
        type="checkbox"
        aria-labelledby={`${id}-label`}
        className="peer sr-only fixed"
        {...props}
      />

      <div
        className={clsx(
          'flex h-4 w-8 items-center',
          'not:disabled:cursor-pointer',
          'box-content rounded-full bg-gray/25 p-0.5 transition-all',
          'after:size-4 after:rounded-full after:bg-neutral after:transition-all',
          'peer-checked:bg-green peer-checked:after:translate-x-full peer-checked:after:bg-neutral',
          'peer-disabled:opacity-50',
        )}
      />
    </div>
  );
}
