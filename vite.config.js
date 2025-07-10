import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit (optional)
    // chunkSizeWarningLimit: 4000, // Set chunk size to 1MB (optional)
    // base: import.meta.env.VITE_API_URL,

    // Enable manual chunks for large dependencies
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'custory-chunk'; // Create a separate chunk for node_modules
          }
        }
      }
    }
  }
});