import type { Meta, StoryObj } from '@storybook/react-vite';

import { FieldLabel } from '../field/field.next';
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
    <FieldLabel className="gap-y-1.5 col items-start">
      <div>{label}</div>
      <Switch disabled={disabled} />
    </FieldLabel>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
