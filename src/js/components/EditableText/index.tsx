import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, type KeyboardEvent, type MouseEvent, type SyntheticEvent } from 'react';

// Constants
import type { ContentSection } from '@/admin/constants';

// Components
import { useInlineEdit } from '@/admin/InlineEditContext';
import { getByPath } from '@/admin/paths';

// Styles
import styles from './styles.module.css';

export interface Props extends Omit<React.ComponentProps<'span'>, 'children'> {
    section: ContentSection;
    path: string;
}

const EditableText: React.FunctionComponent<Props> = ({ section, path, className, ...props }) => {
    const { content, editingSection, update } = useInlineEdit();
    const elementRef = useRef<HTMLSpanElement>(null);
    const id = React.useId();
    const isEditing = editingSection === 'site' || editingSection === section;
    const raw = getByPath(content, path);
    const value = typeof raw === 'string' ? raw : '';
    const valueRef = useRef(value);

    valueRef.current = value;

    const classes = classNames(styles.root, {
        [styles.editing]: isEditing
    }, className);

    useEffect(() => {
        if (isEditing && elementRef.current) {
            elementRef.current.textContent = valueRef.current;
        }
    }, [isEditing]);

    const handleInput = useCallback((event: SyntheticEvent<HTMLSpanElement>) => {
        update(path, event.currentTarget.textContent);
    }, [path, update]);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key !== 'Enter' && event.key !== 'Escape') {
            return;
        }

        event.preventDefault();
        event.currentTarget.blur();
    }, []);

    const handleClick = useCallback((event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    return (
        <span key={`${id}-${isEditing ? 'edit' : 'view'}`} ref={elementRef} {...props} className={classes} contentEditable={isEditing ? true : undefined} suppressContentEditableWarning spellCheck={false} onInput={isEditing ? handleInput : undefined} onKeyDown={isEditing ? handleKeyDown : undefined} onClick={isEditing ? handleClick : undefined}>
            {isEditing ? undefined : value}
        </span>
    );
};

export default EditableText;
