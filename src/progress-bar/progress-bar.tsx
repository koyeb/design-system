import clsx from 'clsx';

type ProgressBarProps = {
  progress?: number;
  className?: string;
};

export function ProgressBar({ progress = 0, className }: ProgressBarProps) {
  const percent = Math.round(progress * 100);

  return (
    <div className={clsx('relative bg-muted h-1.5 rounded-full', className)}>
      <div
        className="absolute left-0 h-full bg-green transition-[width] rounded-full will-change-[width] dark:bg-white/80"
        style={{ width: percent + '%' }}
      />
    </div>
  );
}
