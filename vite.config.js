import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For a project Pages URL, build with VITE_BASE_PATH=/Web/.
  base: process.env.VITE_BASE_PATH || '/',
})
