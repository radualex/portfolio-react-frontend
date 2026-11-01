import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { useAdminMode } from './AdminModeContext';
import { writeAutoEditFlag } from './storage';

const AdminGate: React.FunctionComponent = () => {
    const { enable } = useAdminMode();
    const navigate = useNavigate();

    useEffect(() => {
        let isCancelled = false;

        const enter = async () => {
            const isOk = await enable();

            if (!isOk || isCancelled) {
                return;
            }

            writeAutoEditFlag(true);
            navigate('/', {
                replace: true
            });
        };

        void enter();

        return () => {
            isCancelled = true;
        };
    }, [enable, navigate]);

    return false;
};

export default AdminGate;
