import type { Meta, StoryObj } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Checkbox } from './checkbox';

const meta = {
  title: 'DesignSystem/Checkbox',
  component: Checkbox,
  args: {
    label: 'Label',
  },
  argTypes: {
    checked: controls.boolean(),
    disabled: controls.hidden(),
    indeterminate: controls.boolean(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
