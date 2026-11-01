import React, { useCallback } from 'react';

// Constants
import { EMPTY_VALUE } from './constants';
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';
import { ConflictChoice } from '@/store/constants';

// Components
import AdminDialog from '@/admin/AdminDialog';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast/ToastContext';

// Helpers
import { diffContent } from '@/helpers/diff';
import { formatPath } from './helpers';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

export interface Props extends Omit<React.ComponentProps<typeof AdminDialog>, 'title' | 'onClose' | 'children'> {}

const ContentConflictDialog: React.FunctionComponent<Props> = ({ ...props }) => {
    const { conflict, resolveConflict } = useStore();
    const toast = useToast();

    const handleKeepSaved = useCallback(() => {
        void resolveConflict(ConflictChoice.Discard);
        toast('Kept the saved version');
    }, [resolveConflict, toast]);

    const handleOverwrite = useCallback(() => {
        void resolveConflict(ConflictChoice.Overwrite);
        toast('Overwrote the saved version');
    }, [resolveConflict, toast]);

    if (!conflict) {
        return;
    }

    const changes = diffContent(conflict.mine, conflict.theirs);
    const fieldLabel = `${changes.length} differing field${changes.length === 1 ? '' : 's'}`;
    const lead = `Different content was saved while you were editing. Review the ${fieldLabel}, then choose which version to keep.`;

    return (
        <AdminDialog title="Content changed elsewhere" onClose={handleKeepSaved} {...props}>
            <p className={styles.lead}>{lead}</p>

            <ul className={styles.list}>
                {changes.map((change) => {
                    return (
                        <li className={styles.row} key={change.path}>
                            <span className={styles.path}>{formatPath(change.path)}</span>

                            <span className={styles.saved}>
                                <span className={styles.tag}>saved</span>
                                <span className={styles.value}>{change.theirs || EMPTY_VALUE}</span>
                            </span>

                            <span className={styles.mine}>
                                <span className={styles.tag}>yours</span>
                                <span className={styles.value}>{change.mine || EMPTY_VALUE}</span>
                            </span>
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
