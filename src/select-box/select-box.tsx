import clsx from 'clsx';

import { CheckboxInput } from '../checkbox/checkbox';
import { RadioInput } from '../radio/radio';
import { Extend } from '../utils/types';
import { useId } from '../utils/use-id';

type SelectBoxType = 'checkbox' | 'radio';

type SelectBoxOwnProps = {
  type: SelectBoxType;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
  classes?: Partial<Record<'title' | 'content' | 'description', string>>;
  children?: React.ReactNode;
};

type SelectBoxProps = Extend<React.ComponentProps<'input'>, SelectBoxOwnProps>;

export function SelectBox({
  type,
  icon,
  title,
  description,
  footer,
  disabled,
  className,
  classes,
  children,
  ...props
}: SelectBoxProps) {
  const id = useId(props.id);

  return (
    <label
      htmlFor={id}
      aria-disabled={disabled}
      className={clsx(
        'relative row rounded-lg border transition-colors has-[:checked]:border-green',
        'before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-popover',
        !disabled && 'cursor-pointer hover:bg-muted/50',
        disabled && 'bg-muted text-dim',
        className,
      )}
    >
      <div className="flex items-center justify-center rounded-l-lg px-2">
        {type === 'checkbox' && <CheckboxInput id={id} disabled={disabled} {...props} />}
        {type === 'radio' && <RadioInput id={id} disabled={disabled} {...props} />}
      </div>

      {children ?? (
        <div className={clsx('flex-1', classes?.content)}>
          <div className={clsx('row items-center gap-1 px-2 pt-3 font-semibold', classes?.title)}>
            {icon}
            <span>{title}</span>
          </div>

          <div className={clsx('px-2 pt-1 pb-3 text-xs text-dim', classes?.description)}>{description}</div>

          {footer && <div className="rounded-br-lg px-3 py-1">{footer}</div>}
        </div>
      )}
    </label>
  );
}
