import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     minify: 'terser',
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//         },
//         entryFileNames: 'assets/main.js', // For entry files
//         chunkFileNames: 'assets/vendor.js', // For code-split chunks
//         assetFileNames: (assetInfo) => {
//           // Handle different asset types with specific names
//           if (assetInfo.name.endsWith('.css')) {
//             return 'assets/index.css';
//           }
//           if (assetInfo.name.endsWith('.ico')) {
//             return 'assets/zelleicon.ico';
//           }
//           if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
//             return 'assets/[name][extname]';
//           }
//           // For other assets, keep their original names
//           return `assets/${assetInfo.name}`;
//         },
//       },
//     },
//   },
// })


export default defineConfig(({command, mode}) => {
  console.log(command, mode)

  return {}
})