import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

// Constants
import { DURATION } from './constants';

// Components
import { ToastContext } from '@/components/Toast/ToastContext';

// Styles
import styles from './styles.module.css';

export interface Props {
    children: ReactNode;
}

const ToastProvider: React.FunctionComponent<Props> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isShown, setIsShown] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);

    const toast = useCallback((next: string) => {
        setMessage(next);
        setIsShown(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsShown(false);
        }, DURATION);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <ToastContext value={toast}>
            {children}
            <div className={styles.toast} data-show={isShown ? 'true' : 'false'} role="status" aria-live="polite">
                {message}
            </div>
        </ToastContext>
    );
};

export default ToastProvider;
