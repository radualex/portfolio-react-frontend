import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';

// Constants
import { BLANK, Key } from './constants';
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Helpers
import { required } from '@/helpers/validators';

// Hooks
import useFieldErrors from '@/hooks/useFieldErrors';

// Styles
import styles from './styles.module.css';

// Types
import type { Project, ProjectDraft } from '@/store/types';

export interface Props extends Omit<React.ComponentProps<'dialog'>, 'onClose'> {
    project: Project | null;
    onSave: (draft: ProjectDraft) => void;
    onClose: () => void;
}

const ProjectDialog: React.FunctionComponent<Props> = ({ project, onSave, onClose, className, ...props }) => {
    const classes = classNames(styles.root, className);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const titleFieldRef = useRef<HTMLInputElement>(null);

    const [values, setValues] = useState<Record<Key, string>>(() => {
        return project ? {
            title: project.title,
            kind: project.kind,
            description: project.description,
            stack: project.stack,
            linkLabel: project.linkLabel,
            link: project.link
        } : BLANK;
    });

    const { errors, check, recheck, checkAll } = useFieldErrors<Key>({
        title: required('A project needs a title.'),
        description: required('Describe it in a sentence or two.')
    });

    useEffect(() => {
        dialogRef.current?.showModal();
        titleFieldRef.current?.focus();
    }, []);

    const getField = useCallback((key: Key) => {
        return {
            value: values[key],
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValues((current) => {
                    return {
                        ...current,
                        [key]: event.target.value
                    };
                });
                recheck(key, event.target.value);
            },
            onBlur: () => {
                return check(key, values[key]);
            },
            error: errors[key]
        };
    }, [values, errors, recheck, check]);

    const handleSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!checkAll(values, formRef.current)) {
            return;
        }

        onSave({
            id: project?.id,
            title: values.title.trim(),
            kind: values.kind.trim(),
            description: values.description.trim(),
            stack: values.stack.trim(),
            linkLabel: values.linkLabel.trim(),
            link: values.link.trim()
        });
    }, [checkAll, onSave, project?.id, values]);

    return (
        <dialog className={classes} ref={dialogRef} aria-labelledby="dialog-title" onClose={onClose} {...props}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className={styles.editorHead}>
                    <h2 id="dialog-title">{project ? 'Edit project' : 'Add project'}</h2>
                    <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} onClick={onClose}>
                        Close
                    </Button>
                </div>

                <div className={styles.editorBody}>
                    <TextField ref={titleFieldRef} id="pf-title" label="Title" type="text" {...getField(Key.Title)} />
                    <TextField id="pf-kind" label="Label" type="text" placeholder="Open source" {...getField(Key.Kind)} />
                    <TextAreaField id="pf-description" label="Description" full short {...getField(Key.Description)} />
                    <TextField id="pf-stack" label="Stack" type="text" placeholder="Node.js · TypeScript" {...getField(Key.Stack)} />
                    <TextField id="pf-linkLabel" label="Link label" type="text" placeholder="View on GitHub" {...getField(Key.LinkLabel)} />
                    <TextField id="pf-link" label="Link URL" type="url" full placeholder="https://github.com/radualex" {...getField(Key.Link)} />
                </div>

                <div className={styles.editorFoot}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant={ButtonVariant.Primary} type="submit">
                        Save project
                    </Button>
                </div>
            </form>
        </dialog>
    );
};

export default ProjectDialog;
