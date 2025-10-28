import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { ProgressBar } from './progress-bar';

type Args = {
  label: boolean;
  progress: number;
};

export default {
  title: 'DesignSystem/ProgressBar',
  args: {
    label: true,
  },
  argTypes: {
    progress: controls.range({ min: 0, max: 1, step: 0.01 }),
  },
} satisfies Meta<Args>;

export const progressBar: StoryFn = (args) => {
  return <ProgressBar {...args} className="max-w-sm" />;
};
