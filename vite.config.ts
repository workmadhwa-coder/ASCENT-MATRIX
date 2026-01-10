import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load all env variables (without VITE_ restriction)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // ✅ Build configuration (IMPORTANT FIX)
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },

    // ✅ Environment variables injection
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    // ✅ Path alias
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  };
});
