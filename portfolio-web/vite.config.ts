import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
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
        }
    }
});
