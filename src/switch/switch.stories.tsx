import type { Meta, StoryObj } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Switch } from './switch';

const meta = {
  title: 'DesignSystem/Switch',
  component: Switch,
  parameters: {
    controls: controls.exclude(['onChange']),
  },
  args: {
    label: 'Label',
  },
  argTypes: {
    checked: controls.boolean(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
