import type { Meta, StoryObj } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Radio, RadioLabel } from './radio.next';

type Args = {
  label: string;
  disabled: boolean;
  checked?: boolean;
};

const meta = {
  title: 'DesignSystem/RadioNext',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    checked: controls.boolean(),
  },
  render: ({ label, ...props }) => (
    <RadioLabel disabled={props.disabled}>
      <Radio {...props} />
      {label}
    </RadioLabel>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
