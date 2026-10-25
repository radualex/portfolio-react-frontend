import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';

// Styles
import styles from './styles.module.css';

export interface Props
    extends Omit<React.ComponentProps<'dialog'>, 'onClose' | 'title'> {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const AdminDialog: React.FunctionComponent<Props> = ({ title, onClose, className, children, ...props }) => {
    const classes = classNames(styles.root, className);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleBackdrop = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    }, [onClose]);

    return (
        <dialog className={classes} ref={dialogRef} aria-labelledby="admin-dialog-title" onClose={onClose} onClick={handleBackdrop} {...props}>
            <div className={styles.head}>
                <h2 id="admin-dialog-title">{title}</h2>
                <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} onClick={onClose}>
                    <X size="1rem" aria-hidden />
                    Close
                </Button>
            </div>

            <div className={styles.body}>{children}</div>
        </dialog>
    );
};

export default AdminDialog;
