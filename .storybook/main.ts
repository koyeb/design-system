import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react-vite',
} satisfies StorybookConfig;
