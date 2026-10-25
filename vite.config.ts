import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react()
    ],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src/js', import.meta.url))
        }
    },
    css: {
        /* `.stat-num` in SCSS reads as `styles.statNum` in TSX. */
        modules: {
            localsConvention: 'camelCaseOnly'
        },
        /* So every module can `@use "mixins"` regardless of how deep it sits. */
        preprocessorOptions: {
            scss: {
                loadPaths: [
                    'src/js/scss'
                ]
            }
        }
    }
});
