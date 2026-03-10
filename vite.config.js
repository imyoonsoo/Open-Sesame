import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
  },
>>>>>>> dfdeb8a0f38c5b5e5d478d9a423d9f7ea22f1258
});
