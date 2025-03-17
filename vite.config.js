import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,                   // ou "0.0.0.0"
    port: 3009,
    allowedHosts: [
      'populiz.com',
      'www.populiz.com'
    ]
  },

  // Caso esteja usando `npm run dev` com `server`:
  server: {
    host: true,                   // ou "0.0.0.0"
    port: 3009,
    // não tem allowedHosts por padrão, mas se precisar, pode usar 
    // strictPort, etc.
  },
  plugins: [react()],
})
