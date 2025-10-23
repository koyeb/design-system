import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineField } from '../field/field';
import { controls } from '../utils/storybook';
import { Checkbox } from './checkbox';

type Args = {
  label: string;
  disabled: boolean;
  indeterminate?: boolean;
  checked?: boolean;
};

const meta = {
  title: 'DesignSystem/Checkbox',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    indeterminate: controls.boolean(),
    checked: controls.boolean(),
  },
  render: ({ label, ...props }) => (
    <InlineField>
      <Checkbox {...props} />
      <span>{label}</span>
    </InlineField>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
