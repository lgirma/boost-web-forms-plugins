import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path')

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'boost-web-forms-react'
    },
    minify: false,
    rollupOptions: {
      output: {
        globals: {
          'boost-web-core': 'boost-web-core',
          'vdtree': 'vdtree',
          'boost-web-forms': 'boost-web-forms',
          'react': 'react',
          'react-dom': 'react-dom'
        }
      },
      external: ['vdtree', 'boost-web-core', 'boost-web-forms', 'react', 'react-dom']
    }
  }
})
