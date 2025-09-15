import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use GitHub Pages base in production only to keep local dev at '/'
  base: mode === 'production' ? '/RecommendX/' : '/',
  plugins: [react()],
  build: {
    // Output to docs/ so Pages (Deploy from branch) can serve it
    outDir: 'docs',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
