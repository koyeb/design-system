import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineField } from '../field/field';
import { controls } from '../utils/storybook';
import { Radio } from './radio';

type Args = {
  label: string;
  disabled: boolean;
  checked?: boolean;
};

const meta = {
  title: 'DesignSystem/Radio',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    checked: controls.boolean(),
  },
  render: ({ label, ...props }) => (
    <InlineField>
      <Radio {...props} />
      <span>{label}</span>
    </InlineField>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
