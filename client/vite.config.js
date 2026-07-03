import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base задаётся под GitHub Pages: https://<user>.github.io/<repo>/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/novatech-productivity/',
});
