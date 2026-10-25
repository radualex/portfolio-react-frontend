import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Styles
import '@/styles/global.css';

import App from '@/App'; // eslint-disable-line @onefinity/eslint-config/import-grouping

const root = document.querySelector('#root');

if (!root) {
    throw new Error('#root is missing from index.html.');
}

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
