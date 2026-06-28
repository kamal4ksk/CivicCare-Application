import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force dev server restart to reload cached files
export default defineConfig({
  plugins: [react(), tailwindcss()],
})