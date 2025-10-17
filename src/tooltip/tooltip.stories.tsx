import { Placement } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { controls } from '../utils/storybook';
import { Tooltip, TooltipTitle } from './tooltip';

const meta = {
  title: 'DesignSystem/Tooltip',
  parameters: {
    layout: 'centered',
    controls: controls.exclude(['setOpen', 'trigger', 'content', 'root', 'className']),
  },
  component: Tooltip,
  args: {
    content: ({ onClose }) => (
      <>
        This is a tooltip
        <Button onClick={onClose} className="my-6 w-full sm:hidden">
          Close
        </Button>
      </>
    ),
    trigger: (props) => <div className="size-24 rounded bg-inverted/25 font-semibold" {...props} />,
  },
  argTypes: {
    open: controls.boolean(),
    arrow: controls.boolean(),
    allowHover: controls.boolean(),
    placement: controls.inlineRadio<Placement>(['top', 'left', 'right', 'bottom']),
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    content: (props) => (
      <div className="col gap-3">
        <TooltipTitle title="Hello, tooltip!" />
        <div>{meta.args.content(props)}</div>
      </div>
    ),
  },
};
