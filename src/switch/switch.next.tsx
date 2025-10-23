import clsx from 'clsx';

import { useFieldId } from '../next';

type SwitchProps = React.ComponentProps<'input'>;

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
