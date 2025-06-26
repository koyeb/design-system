import { cva } from 'class-variance-authority';

import { Extend } from '../utils/types';

type TabButtonsProps = {
  size?: 1 | 2;
  className?: string;
  children?: React.ReactNode;
};

export function TabButtons({ size = 2, className, children }: TabButtonsProps) {
  return (
    <div className="max-w-full overflow-x-auto">
      <div role="tablist" className={TabButtons.className({ size, className })}>
        {children}
      </div>
    </div>
  );
}

TabButtons.className = cva('row w-fit gap-2 rounded-md bg-muted p-1', {
  variants: {
    size: {
      1: 'h-8',
      2: 'h-10',
    },
  },
});

type TabButtonProps = Extend<
  React.ComponentProps<'button'>,
  {
    size?: 1 | 2;
    selected: boolean;
    panelId?: string;
    className?: string;
  }
>;

export function TabButton({ size, selected, panelId, className, ...props }: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      className={TabButton.className({ size, selected, className })}
      aria-selected={selected}
      aria-controls={panelId}
      {...props}
    />
  );
}

TabButton.className = cva(
  [
    'col h-full flex-1 items-center justify-center',
    'rounded px-3 whitespace-nowrap focusable transition-all',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        1: 'text-xs',
        2: 'font-medium',
      },
      selected: {
        false: 'text-dim hover:bg-neutral/50 hover:text-default',
        true: 'bg-neutral',
      },
    },
  },
);
