export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL || 'http://localhost:5000', // URL del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
});
