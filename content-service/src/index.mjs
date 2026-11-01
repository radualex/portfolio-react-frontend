import { mkdir } from 'node:fs/promises';

// Service
import { createApp } from './app.mjs';

const port = Number(process.env.PORT ?? 4000);
const dataDir = process.env.DATA_DIR ?? './.data';
const credentials = process.env.ADMIN_CREDENTIALS ?? '';
const origins = (process.env.ALLOWED_ORIGIN ?? '')
    .split(',')
    .map((origin) => {
        return origin.trim();
    })
    .filter(Boolean);

if (!credentials) {
    console.warn('ADMIN_CREDENTIALS is not set; every write will be rejected.');
}

await mkdir(dataDir, { recursive: true });

createApp({ dataDir, credentials, origins }).listen(port, () => {
    console.log(`content-service listening on :${port}`);
});
