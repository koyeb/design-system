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
        //
        '@floating-ui/react',
        'class-variance-authority',
        'clsx',
        'lucide-static',
        'react',
        'react/jsx-runtime',
      ],
    },
  },
});
