# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        injectData: {
          inline: true, // Enables inlining
        },
      },
    }),
  ],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        entryFileNames: 'assets/main.js', // For entry files
        chunkFileNames: 'assets/vendor.js', // For code-split chunks
        assetFileNames: (assetInfo) => {
          // Handle different asset types with specific names
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/index.css';
          }
          if (assetInfo.name.endsWith('.ico')) {
            return 'assets/zelleicon.ico';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/[name][extname]';
          }
          // For other assets, keep their original names
          return `assets/${assetInfo.name}`;
        },
      },
    },
  },
})
```
