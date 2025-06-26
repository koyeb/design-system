import clsx from 'clsx';
import { HelpCircleIcon, InfoIcon } from 'lucide-react';

import { Tooltip } from '../tooltip/tooltip';

type HelpProps = {
  icon?: 'help' | 'info';
  className?: string;
  children: React.ReactNode;
};

export function HelpTooltip({ icon = 'help', className, children }: HelpProps) {
  const Icon = icon === 'help' ? HelpCircleIcon : InfoIcon;

  return (
    <Tooltip allowHover content={children}>
      {(props) => <Icon {...props} className={clsx('inline-block icon !size-4', className)} />}
    </Tooltip>
  );
}
