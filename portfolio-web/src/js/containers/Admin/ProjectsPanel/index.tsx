import React, { useCallback, useState } from 'react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import Panel from '@/components/Panel';
import Tag from '@/components/Tag';

// Containers
import ProjectDialog from '@/containers/Admin/ProjectDialog';

// Hooks
import { useSaveOutcome } from '@/hooks/useSaveOutcome';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

// Types
import type { Project, ProjectDraft } from '@/store/types';
import type { Editing } from './types';

const ProjectsPanel: React.FunctionComponent = () => {
    const { projects, saveProject, removeProject, moveProject } = useStore();
    const report = useSaveOutcome();
    const [editing, setEditing] = useState<Editing>();

    const all = projects({
        includeHidden: true
    });
    const shown = all.filter((project) => {
        return !project.hidden;
    }).length;

    const write = useCallback(async (draft: ProjectDraft) => {
        report(await saveProject(draft), 'Project saved');
    }, [report, saveProject]);

    const handleSave = useCallback((draft: ProjectDraft) => {
        setEditing(undefined);
        void write(draft);
    }, [write]);

    const handleAdd = useCallback(() => {
        setEditing({
            project: null // eslint-disable-line unicorn/no-null -- ProjectDialog's public project prop is typed Project | null, so "add" must pass null.
        });
    }, []);

    const handleClose = useCallback(() => {
        setEditing(undefined);
    }, []);

    const handleEdit = useCallback((project: Project) => {
        setEditing({
            project
        });
    }, []);

    const toggle = useCallback(async (project: Project) => {
        report(await saveProject({
            id: project.id,
            hidden: !project.hidden
        }), project.hidden ? 'Shown on the site' : 'Hidden from the site');
    }, [report, saveProject]);

    const handleToggle = useCallback((project: Project) => {
        void toggle(project);
    }, [toggle]);

    const drop = useCallback(async (id: string) => {
        report(await removeProject(id), 'Project deleted');
    }, [report, removeProject]);

    const handleRemove = useCallback((project: Project) => {
        if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) {
            return;
        }
        void drop(project.id);
    }, [drop]);

    const move = useCallback(async (project: Project, delta: number) => {
        report(await moveProject(project.id, delta), 'Project moved');
    }, [moveProject, report]);

    const handleMoveUp = useCallback((project: Project) => {
        void move(project, -1);
    }, [move]);

    const handleMoveDown = useCallback((project: Project) => {
        void move(project, 1);
    }, [move]);

    const note = (
        <React.Fragment>
            <span className={styles.num}>{shown}</span> shown on the site · <span className={styles.num}>{all.length}</span> total
        </React.Fragment>
    );
    const actions = (
        <Button size={ButtonSize.Sm} onClick={handleAdd}>
            Add project
        </Button>
    );
    const isEmpty = all.length === 0;
    const rows = all.map((project, index) => {
        return (
            <div className={styles.row} key={project.id} data-hidden={project.hidden ? 'true' : 'false'}>
                <div className={styles.rowMain}>
                    <div className={styles.rowTitle}>
                        <h3>{project.title}</h3>
                        {project.hidden ? (
                            <Tag>Hidden</Tag>
                        ) : (
                            <span className={styles.rowKind}>{project.kind}</span>
                        )}
                    </div>
                    <p className={styles.rowDescription}>{project.description}</p>
                    <p className={styles.rowMeta}>
                        {project.stack}
                        {project.link && ` · ${project.link}`}
                    </p>
                </div>

                <div className={styles.rowActions}>
                    <Button size={ButtonSize.Sm} disabled={index === 0} aria-label={`Move ${project.title} up`} onClick={handleMoveUp.bind(undefined, project)}>
                        ↑
                    </Button>
                    <Button size={ButtonSize.Sm} disabled={index === all.length - 1} aria-label={`Move ${project.title} down`} onClick={handleMoveDown.bind(undefined, project)}>
                        ↓
                    </Button>
                    <Button size={ButtonSize.Sm} onClick={handleToggle.bind(undefined, project)}>
                        {project.hidden ? 'Show' : 'Hide'}
                    </Button>
                    <Button size={ButtonSize.Sm} onClick={handleEdit.bind(undefined, project)}>
                        Edit
                    </Button>
                    <Button variant={ButtonVariant.Danger} size={ButtonSize.Sm} onClick={handleRemove.bind(undefined, project)}>
                        Delete
                    </Button>
                </div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <Panel title="Projects" note={note} action={actions}>
                {isEmpty ? <EmptyState title="No projects yet" description="Add one and it will appear in the projects grid on the landing page." /> : rows}
            </Panel>

            {editing && (
                <ProjectDialog project={editing.project} onSave={handleSave} onClose={handleClose} />
            )}
        </React.Fragment>
    );
};

export default ProjectsPanel;
