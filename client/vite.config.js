import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend en el puerto 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Directorio de salida para producción
    rollupOptions: {
      input: './index.html', // Asegúrate de que el punto de entrada sea correcto
    },
  },
});
