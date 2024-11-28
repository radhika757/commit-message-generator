// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Ensure the output is in the 'dist' folder
    rollupOptions: {
      input: 'src/main.tsx', // Adjust based on your entry file
    },
  },
});
