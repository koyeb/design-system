import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true, exclude: ['**/*.stories.tsx'] })],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      entry: 'src/index.ts',
      fileName: 'main',
    },
    rollupOptions: {
      external: [
        '@floating-ui/react',
        /^@shikijs/,
        '@tanstack/react-ranger',
        'class-variance-authority',
        'shiki',
        'clsx',
        'downshift',
        'framer-motion',
        'lucide-react',
        'react',
        'react/jsx-runtime',
      ],
    },
  },
});
