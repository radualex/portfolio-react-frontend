import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Components
import AdminGate from '@/admin/AdminGate';
import AdminModeProvider from '@/admin/AdminModeProvider';
import InlineEditProvider from '@/admin/InlineEditProvider';
import ScrollToHash from '@/components/ScrollToHash';
import ToastProvider from '@/components/Toast';

// Containers
import Contact from '@/containers/Contact';
import Home from '@/containers/Home';

// Store
import StoreProvider from '@/store/StoreProvider';

const App: React.FunctionComponent = () => {
    return (
        <StoreProvider>
            <ToastProvider>
                <AdminModeProvider>
                    <InlineEditProvider>
                        <ScrollToHash />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin" element={<AdminGate />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </InlineEditProvider>
                </AdminModeProvider>
            </ToastProvider>
        </StoreProvider>
    );
};

export default App;
