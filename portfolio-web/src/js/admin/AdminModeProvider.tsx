import React, { lazy, Suspense, useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Constants
import type { EditorTarget } from './constants';

// Components
import AdminToolbar from './AdminToolbar';
import { AdminModeContext, type AdminModeValue, type AdminStatus } from './AdminModeContext';
import { checkAdminAuth } from './auth';
import { readAdminFlag, writeAdminFlag } from './storage';

const InlineAdmin = lazy(() => {
    return import('./InlineAdmin');
});

const editorReducer = (_current: EditorTarget | undefined, next: EditorTarget | undefined): EditorTarget | undefined => {
    return next;
};

export interface Props {
    children: ReactNode;
}

const AdminModeProvider: React.FunctionComponent<Props> = ({ children }) => {
    const [status, setStatus] = useState<AdminStatus>(() => {
        return readAdminFlag() ? 'checking' : 'off';
    });
    const [editor, dispatchEditor] = useReducer(editorReducer, undefined);
    const location = useLocation();

    useEffect(() => {
        dispatchEditor(undefined);
    }, [location.pathname]);

    useEffect(() => {
        if (status !== 'checking') {
            return;
        }

        let isCancelled = false;

        const verify = async () => {
            const isOk = await checkAdminAuth();

            if (!isCancelled) {
                if (isOk) {
                    setStatus('on');
                } else {
                    writeAdminFlag(false);
                    setStatus('off');
                }
            }
        };

        void verify();

        return () => {
            isCancelled = true;
        };
    }, [status]);

    const enable = useCallback(async (): Promise<boolean> => {
        setStatus('checking');

        const isOk = await checkAdminAuth();

        if (!isOk) {
            writeAdminFlag(false);
            setStatus('off');

            return false;
        }

        writeAdminFlag(true);
        setStatus('on');

        return true;
    }, []);

    const exit = useCallback(() => {
        writeAdminFlag(false);
        setStatus('off');
        dispatchEditor(undefined);
    }, []);

    const openEditor = useCallback((target: EditorTarget) => {
        dispatchEditor(target);
    }, []);

    const closeEditor = useCallback(() => {
        dispatchEditor(undefined);
    }, []);

    const value = useMemo<AdminModeValue>(() => {
        return {
            status,
            isAdmin: status === 'on',
            enable,
            exit,
            openEditor
        };
    }, [status, enable, exit, openEditor]);

    return (
        <AdminModeContext value={value}>
            {children}
            {status === 'on' && (
                <React.Fragment>
                    <AdminToolbar />
                    <Suspense>
                        <InlineAdmin editor={editor} onClose={closeEditor} />
                    </Suspense>
                </React.Fragment>
            )}
        </AdminModeContext>
    );
};

export default AdminModeProvider;
