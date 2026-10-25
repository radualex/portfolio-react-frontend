import classNames from 'classnames';
import React, { useCallback } from 'react';
import { CircleDot, Eye, Inbox, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Constants
import { EditorTarget } from '@/admin/constants';

// Components
import { useAdminMode } from '@/admin/AdminModeContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'div'> {}

const AdminToolbar: React.FunctionComponent<Props> = ({ className, ...props }) => {
    const classes = classNames(styles.root, className);
    const { exit, openEditor } = useAdminMode();
    const location = useLocation();

    const handleSections = useCallback(() => {
        openEditor(EditorTarget.Sections);
    }, [openEditor]);

    const handleAvailability = useCallback(() => {
        openEditor(EditorTarget.Availability);
    }, [openEditor]);

    const handleInbox = useCallback(() => {
        openEditor(EditorTarget.Inbox);
    }, [openEditor]);

    if (location.pathname === '/admin') {
        return;
    }

    return (
        <div className={classes} role="toolbar" aria-label="Admin tools" {...props}>
            <span className={styles.label}>Admin mode</span>

            <button className={styles.action} type="button" onClick={handleSections}>
                <Eye size="1rem" aria-hidden />
                Sections
            </button>

            <button className={styles.action} type="button" onClick={handleAvailability}>
                <CircleDot size="1rem" aria-hidden />
                Availability
            </button>

            <button className={styles.action} type="button" onClick={handleInbox}>
                <Inbox size="1rem" aria-hidden />
                Inbox
            </button>

            <button className={styles.action} type="button" onClick={exit}>
                <LogOut size="1rem" aria-hidden />
                Exit
            </button>
        </div>
    );
};

export default AdminToolbar;
