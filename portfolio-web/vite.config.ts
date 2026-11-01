import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const developmentCredentials = process.env.DEV_ADMIN_CREDENTIALS ?? 'admin:dev';
const basicAuth = Buffer.from(developmentCredentials).toString('base64'); // eslint-disable-line unicorn/prefer-uint8array-base64 -- Uint8Array#toBase64 is absent from every TS lib target

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: false,
                headers: {
                    Authorization: `Basic ${basicAuth}`
                }
            }
        }
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
