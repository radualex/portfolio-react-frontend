import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Pencil } from 'lucide-react';

// Constants
import type { ContentSection } from '@/admin/constants';

// Components
import { useAdminMode } from '@/admin/AdminModeContext';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.css';

export interface Props extends Omit<React.ComponentProps<'button'>, 'onClick'> {
    target: ContentSection;
    label: string;
}

const SectionEditButton: React.FunctionComponent<Props> = ({ target, label, className, ...props }) => {
    const { isAdmin } = useAdminMode();
    const { editingSection, start } = useInlineEdit();
    const classes = classNames(styles.root, className);

    const handleClick = useCallback(() => {
        start(target);
    }, [start, target]);

    if (!isAdmin || editingSection) {
        return;
    }

    return (
        <button className={classes} type="button" aria-label={`Edit ${label}`} onClick={handleClick} {...props}>
            <Pencil size="1rem" aria-hidden />
        </button>
    );
};

export default SectionEditButton;
