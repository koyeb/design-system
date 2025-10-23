import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { Slider } from './slider';

type Args = {
  disabled: boolean;
  min: number;
  max: number;
  step: number;
};

const meta = {
  title: 'DesignSystem/Slider',
  args: {
    disabled: false,
    min: 0,
    max: 8,
    step: 1,
  },
} satisfies Meta<Args>;

export default meta;

export const Default: StoryFn = (args) => {
  const [value, setValue] = useState(2);

  return (
    <Slider
      {...args}
      value={[value]}
      onChange={([value]) => setValue(value)}
      renderTick={(value) => <div className="mt-2">{value}</div>}
    />
  );
};

export const Range: StoryFn = (args) => {
  const [value, setValue] = useState<[number, number]>([2, 5]);

  return (
    <Slider
      {...args}
      value={value}
      onChange={([min, max]) => setValue([min, max])}
      renderTick={(value) => <div className="mt-2">{value}</div>}
    />
  );
};
