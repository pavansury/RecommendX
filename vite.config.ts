import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for GitHub Pages: https://pavansury.github.io/RecommendX/
  base: '/RecommendX/',
  plugins: [react()],
  build: {
    // Output to docs/ so Pages (Deploy from branch) can serve it
    outDir: 'docs',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
