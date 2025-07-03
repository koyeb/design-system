import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

export function Menu({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'z-50 col items-stretch rounded-md border bg-popover p-1 text-zinc-950 shadow-lg dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  );
}

type MenuItemProps = {
  className?: string;
  children?: React.ReactNode;
};

export function MenuItem({ className, ...props }: MenuItemProps) {
  return <div className={MenuItem.className({ className })} {...props} />;
}

MenuItem.className = cva(
  'row w-full items-center gap-2 rounded px-1.5 py-2 hover:bg-muted disabled:text-dim disabled:hover:bg-transparent',
);

export function ButtonMenuItem({ className, ...props }: React.ComponentProps<'button'>) {
  return <button type="button" className={MenuItem.className({ className })} {...props} />;
}
