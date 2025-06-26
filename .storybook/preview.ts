import type { Preview } from '@storybook/react';

import '@fontsource-variable/inter';
import './styles.css';

export default {
  parameters: {
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
    },
  },
} satisfies Preview;
