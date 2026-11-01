import React, { useCallback } from 'react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import AdminDialog from '@/admin/AdminDialog';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast/ToastContext';

// Helpers
import { diffContent } from '@/helpers/diff';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

const formatPath = (path: string): string => {
    return path.replaceAll('.', ' · ');
};

const ContentConflictDialog: React.FunctionComponent = () => {
    const { conflict, resolveConflict } = useStore();
    const toast = useToast();

    const handleKeepSaved = useCallback(() => {
        void resolveConflict('discard');
        toast('Kept the saved version');
    }, [resolveConflict, toast]);

    const handleOverwrite = useCallback(() => {
        void resolveConflict('overwrite');
        toast('Overwrote the saved version');
    }, [resolveConflict, toast]);

    if (!conflict) {
        return;
    }

    const changes = diffContent(conflict.mine, conflict.theirs);

    return (
        <AdminDialog title="Content changed elsewhere" onClose={handleKeepSaved}>
            <p className={styles.lead}>
                Different content was saved while you were editing. Review the
                {' '}
                {changes.length}
                {' '}
                differing field
                {changes.length === 1 ? '' : 's'}
                , then choose which version to keep.
            </p>

            <ul className={styles.list}>
                {changes.map((change) => {
                    return (
                        <li className={styles.row} key={change.path}>
                            <span className={styles.path}>{formatPath(change.path)}</span>
                            <span className={styles.saved}>{change.theirs || '(empty)'}</span>
                            <span className={styles.arrow} aria-hidden>
                                &darr; saved &nbsp; &uarr; yours
                            </span>
                            <span className={styles.mine}>{change.mine || '(empty)'}</span>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.actions}>
                <Button size={ButtonSize.Sm} onClick={handleKeepSaved}>
                    Keep saved version
                </Button>

                <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={handleOverwrite}>
                    Overwrite with mine
                </Button>
            </div>
        </AdminDialog>
    );
};

export default ContentConflictDialog;
