import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import { controls } from '../utils/storybook';
import { Code, Json } from './code';

const meta = {
  title: 'DesignSystem/Code',
  parameters: {
    controls: controls.exclude(['width', 'children']),
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj<typeof Code> = {
  render: (args) => <Code {...args} theme={useDarkMode() ? 'dark' : 'light'} />,
  args: {
    lang: 'javascript',
    value:
      "import type { Meta } from '@storybook/react-vite';\n\nexport default {\n  title: 'MyStory',\n} satisfies Meta;",
  },
};

export const json: StoryObj<typeof Json> = {
  render: (args) => <Json {...args} />,
  args: {
    value: {
      string: 'value',
      number: 42,
      boolean: true,
      null: null,
    },
  },
};
