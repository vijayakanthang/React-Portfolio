import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // react-draggable (used by react-rnd) reads process.env.* at drag time.
  // Vite 8 / Rolldown doesn't shim `process` in the browser, so those reads
  // throw "process is not defined" and silently kill window dragging. Define
  // the specific vars it touches (not the whole object, which can break libs).
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    "process.env.DRAGGABLE_DEBUG": "false",
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Vite 8 bundles with Rolldown; split vendor chunks via its
        // advancedChunks API (the old `manualChunks` object is unsupported).
        advancedChunks: {
          groups: [
            { name: 'three', test: /node_modules\/three\// },
            {
              name: 'r3f',
              test: /node_modules\/@react-three\//,
            },
          ],
        },
      },
    },
  },
})
