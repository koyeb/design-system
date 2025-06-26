import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Badge } from './badge';

const meta = {
  title: 'DesignSystem/Badge',
  argTypes: {
    size: controls.inlineRadio([1, 2]),
    color: controls.inlineRadio(['red', 'green', ' blue', 'orange', 'gray']),
  },
} satisfies Meta;

export default meta;

export const Default: StoryFn = (args) => {
  return <Badge {...args}>children</Badge>;
};
