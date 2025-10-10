import { Placement } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { useBreakpoint } from '../utils/media-query';
import { controls } from '../utils/storybook';
import { TooltipDesktop, TooltipMobile, TooltipTitle } from './tooltip';

function Tooltip(props: React.ComponentProps<typeof TooltipDesktop>) {
  const isMobile = !useBreakpoint('sm');
  const Element = isMobile ? TooltipMobile : TooltipDesktop;

  return <Element {...props} />;
}

const meta = {
  title: 'DesignSystem/Tooltip',
  parameters: {
    layout: 'centered',
    controls: controls.exclude(['trigger', 'content', 'className']),
  },
  component: Tooltip,
  args: {
    content: 'This is a tooltip',
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
    content: (
      <div className="col gap-3">
        <TooltipTitle title="Hello, tooltip!" />
        <div>{meta.args.content}</div>
      </div>
    ),
  },
};
