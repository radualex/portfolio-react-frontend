import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Check, Settings2, X } from 'lucide-react';

// Constants
import { EDITOR_TARGET_BY_SECTION, EditorTarget, SECTION_LABELS } from '@/admin/constants';
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import { useAdminMode } from '@/admin/AdminModeContext';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'div'> {}

const InlineEditBar: React.FunctionComponent<Props> = ({ className, ...props }) => {
    const classes = classNames(styles.root, className);
    const { editingSection, save, cancel } = useInlineEdit();
    const { openEditor } = useAdminMode();

    const handleManage = useCallback(() => {
        if (!editingSection) {
            return;
        }

        const target: EditorTarget
            = editingSection === 'site' ? EditorTarget.Content : EDITOR_TARGET_BY_SECTION[editingSection];

        save();
        openEditor(target);
    }, [editingSection, openEditor, save]);

    if (!editingSection) {
        return;
    }

    const label = editingSection === 'site' ? 'site' : SECTION_LABELS[editingSection];

    return (
        <div className={classes} role="toolbar" aria-label="Inline editing" {...props}>
            <span className={styles.label}>Editing {label}</span>

            <Button size={ButtonSize.Sm} onClick={cancel}>
                <X size="1rem" aria-hidden />
                Cancel
            </Button>

            <Button size={ButtonSize.Sm} onClick={handleManage}>
                <Settings2 size="1rem" aria-hidden />
                Manage
            </Button>

            <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={save}>
                <Check size="1rem" aria-hidden />
                Save
            </Button>
        </div>
    );
};

export default InlineEditBar;
