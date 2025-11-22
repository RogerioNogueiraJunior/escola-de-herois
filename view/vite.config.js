// view/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Quando o React tentar acessar '/api', ele será redirecionado para o backend (porta 3000)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // Use false para ambientes de desenvolvimento local (http)
      },
    },
  },
})