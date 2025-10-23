import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineField } from '../field/field.next';
import { Switch } from './switch.next';

type Args = {
  label: string;
  disabled: boolean;
};

const meta = {
  title: 'DesignSystem/SwitchNext',
  args: {
    label: 'Label',
    disabled: false,
  },
  render: ({ label, disabled }) => (
    <InlineField>
      <Switch disabled={disabled} />
      <span>{label}</span>
    </InlineField>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
