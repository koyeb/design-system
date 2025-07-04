import clsx from 'clsx';

import { FieldLabel } from '../field/field';
import { HelpTooltip } from '../help-tooltip/help-tooltip';
import { Extend } from '../utils/types';
import { useId } from '../utils/use-id';

type SwitchOwnProps = {
  label: React.ReactNode;
  labelPosition?: 'top' | 'left';
  helpTooltip?: React.ReactNode;
};

type SwitchProps = Extend<React.ComponentProps<'input'>, SwitchOwnProps>;

export function Switch({ label, labelPosition = 'top', helpTooltip, className, ...props }: SwitchProps) {
  const id = useId(props.id);

  return (
    <FieldLabel
      id={`${id}-label`}
      htmlFor={id}
      className={clsx(
        'inline-flex rounded focusable-within outline-offset-4',
        !props.disabled && 'cursor-pointer',
        {
          'flex-col items-start gap-1.5': labelPosition === 'top',
          'flex-row items-center gap-2': labelPosition === 'left',
        },
        className,
      )}
    >
      {label && (
        <div className={clsx('row items-center gap-2', labelPosition === 'left' && 'order-2')}>
          {label}
          {helpTooltip && <HelpTooltip>{helpTooltip}</HelpTooltip>}
        </div>
      )}

      <div className="row h-8 items-center">
        <input
          type="checkbox"
          className="peer sr-only fixed"
          aria-labelledby={`${id}-label`}
          id={id}
          {...props}
        />

        <div
          className={clsx(
            'flex h-4 w-8 items-center',
            'box-content rounded-full bg-gray/25 p-0.5 transition-all',
            'after:size-4 after:rounded-full after:bg-neutral after:transition-all',
            'peer-checked:bg-green peer-checked:after:translate-x-full peer-checked:after:bg-neutral',
            'peer-disabled:opacity-50',
          )}
        />
      </div>
    </FieldLabel>
  );
}
