import { defineConfig } from 'vite'
const path = require('path')

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'boost-web-forms-bootstrap'
        },
        minify: false,
        rollupOptions: {
            output: {
                globals: {
                    'boost-web-core': 'boost-web-core',
                    'vdtree': 'vdtree',
                    'boost-web-forms': 'boost-web-forms',
                }
            },
            external: ['vdtree', 'boost-web-core', 'boost-web-forms']
        }
    }
})
