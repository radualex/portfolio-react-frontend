import classNames from 'classnames';
import React, { useCallback, useState, type ChangeEvent, type SyntheticEvent } from 'react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import PillField from '@/components/PillField';
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Store
import { SKILL_SUGGESTIONS } from '@/store/defaults';
import { uid } from '@/store/storage';

// Styles
import styles from './styles.module.css';

// Types
import type { ExperienceContent, RoleItem } from '@/store/types';
import type { TextKey } from '../types';

export interface Props extends Omit<React.ComponentProps<'div'>, 'onChange'> {
    experience: ExperienceContent;
    onChange: (next: ExperienceContent) => void;
}

const ExperienceEditor: React.FunctionComponent<Props> = ({ experience, onChange, className, ...props }) => {
    const classes = classNames(styles.root, className);
    const [openIds, setOpenIds] = useState<string[]>([]);

    const handleToggle = useCallback((id: string, event: SyntheticEvent<HTMLDetailsElement>) => {
        const isOpen = event.currentTarget.open;

        setOpenIds((current) => {
            if (isOpen) {
                return current.includes(id) ? current : [...current, id];
            }

            return current.filter((value) => {
                return value !== id;
            });
        });
    }, []);

    const handleAdd = useCallback(() => {
        const role: RoleItem = {
            id: uid('role'),
            period: '',
            title: '',
            org: '',
            what: '',
            stack: []
        };

        onChange({
            ...experience,
            roles: [...experience.roles, role]
        });
        setOpenIds((current) => {
            return [...current, role.id];
        });
    }, [experience, onChange]);

    const handleRemove = useCallback((id: string) => {
        if (!confirm('Remove this role? Save content to apply the change.')) {
            return;
        }

        onChange({
            ...experience,
            roles: experience.roles.filter((role) => {
                return role.id !== id;
            })
        });
        setOpenIds((current) => {
            return current.filter((value) => {
                return value !== id;
            });
        });
    }, [experience, onChange]);

    const handleMove = useCallback((id: string, delta: number) => {
        const from = experience.roles.findIndex((role) => {
            return role.id === id;
        });
        const to = from + delta;

        if (from === -1 || to < 0 || to >= experience.roles.length) {
            return;
        }

        const roles = [...experience.roles];
        const [moved] = roles.splice(from, 1);

        roles.splice(to, 0, moved);
        onChange({
            ...experience,
            roles
        });
    }, [experience, onChange]);

    const handleField = useCallback((id: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as TextKey<RoleItem>;

        onChange({
            ...experience,
            roles: experience.roles.map((role) => {
                return role.id === id ? {
                    ...role,
                    [field]: event.target.value
                } : role;
            })
        });
    }, [experience, onChange]);

    const handleStack = useCallback((id: string, next: string[]) => {
        onChange({
            ...experience,
            roles: experience.roles.map((role) => {
                return role.id === id ? {
                    ...role,
                    stack: next
                } : role;
            })
        });
    }, [experience, onChange]);

    return (
        <div className={classes} {...props}>
            <div className={styles.toolbar}>
                <p className={styles.count}>
                    {experience.roles.length} {experience.roles.length === 1 ? 'role' : 'roles'}
                </p>
                <Button size={ButtonSize.Sm} onClick={handleAdd}>
                    Add role
                </Button>
            </div>

            <div className={styles.items}>
                {experience.roles.map((role, index) => {
                    return (
                        <details className={styles.item} key={role.id} open={openIds.includes(role.id)} onToggle={handleToggle.bind(undefined, role.id)}>
                            <summary className={styles.summary}>
                                <strong>{role.title || 'Untitled role'}</strong>
                                <span className={styles.meta}>
                                    {role.period || 'No period'}
                                </span>
                            </summary>

                            <div className={styles.fields}>
                                <TextField id={`content-role-${role.id}-period`} label="Period" type="text" name="period" value={role.period} onChange={handleField.bind(undefined, role.id)} />
                                <TextField id={`content-role-${role.id}-title`} label="Title" type="text" name="title" value={role.title} onChange={handleField.bind(undefined, role.id)} />
                                <TextField id={`content-role-${role.id}-org`} label="Organisation" type="text" name="org" full value={role.org} onChange={handleField.bind(undefined, role.id)} />
                                <TextAreaField id={`content-role-${role.id}-what`} label="What" full rows={3} name="what" value={role.what} onChange={handleField.bind(undefined, role.id)} />
                                <PillField id={`content-role-${role.id}-stack`} label="Stack" full value={role.stack} onChange={handleStack.bind(undefined, role.id)} suggestions={SKILL_SUGGESTIONS} hint="Type to search, or press Enter to add a new skill." />
                            </div>

                            <div className={styles.actions}>
                                <Button size={ButtonSize.Sm} disabled={index === 0} aria-label={`Move ${role.title || 'role'} up`} onClick={handleMove.bind(undefined, role.id, -1)}>
                                    ↑
                                </Button>
                                <Button size={ButtonSize.Sm} disabled={index === experience.roles.length - 1} aria-label={`Move ${role.title || 'role'} down`} onClick={handleMove.bind(undefined, role.id, 1)}>
                                    ↓
                                </Button>
                                <Button variant={ButtonVariant.Danger} size={ButtonSize.Sm} onClick={handleRemove.bind(undefined, role.id)}>
                                    Delete
                                </Button>
                            </div>
                        </details>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperienceEditor;
