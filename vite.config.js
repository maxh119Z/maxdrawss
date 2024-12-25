import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/maxdrawss/', // Required for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true, // Optional for debugging production builds
  },
});
