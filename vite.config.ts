import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The lesson content ships in the main bundle (~230 kB gzipped in total).
  build: { chunkSizeWarningLimit: 900 },
})
