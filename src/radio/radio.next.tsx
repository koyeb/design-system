import { cva } from 'class-variance-authority';

import { FieldLabel } from '../next';

export function RadioLabel({
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

type RadioProps = React.ComponentProps<'input'>;

export function Radio({ className, ...props }: RadioProps) {
  return (
    <>
      <input type="radio" className="peer sr-only fixed" {...props} />

      <span className="leading-none peer-checked:hidden peer-disabled:[&>span]:bg-muted">
        <span className="inline-block size-4 rounded-full border" />
      </span>

      <span className="hidden leading-none peer-checked:block">
        <Checked className="size-4" />
      </span>
    </>
  );
}

function Checked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <circle cx="8" cy="8" r="8" className="fill-green" />
      <circle cx="8" cy="8" r="2" className="fill-neutral" />
    </svg>
  );
}
