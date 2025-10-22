import type { Meta, StoryObj } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Checkbox, CheckboxLabel } from './checkbox.next';

type Args = {
  label: string;
  disabled: boolean;
  indeterminate?: boolean;
  checked?: boolean;
};

const meta = {
  title: 'DesignSystem/CheckboxNext',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    indeterminate: controls.boolean(),
    checked: controls.boolean(),
  },
  render: ({ label, ...props }) => (
    <CheckboxLabel disabled={props.disabled}>
      <Checkbox {...props} />
      {label}
    </CheckboxLabel>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
