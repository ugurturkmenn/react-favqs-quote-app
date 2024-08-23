import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://favqs.com/api',  // API'nin HTTPS adresi
        changeOrigin: true,
        secure: false, // self-signed sertifika kullanıyorsanız secure: false olarak ayarlayın
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
