import React, { useCallback, useState } from "react";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";
import { useToast } from "@/components/Toast/ToastContext";
import ProjectDialog from "@/containers/Admin/ProjectDialog";
import { useStore } from "@/store/StoreContext";
import type { Project, ProjectDraft } from "@/store/types";
import type { Editing } from "./types";
import styles from "./styles.module.scss";

const ProjectsPanel: React.FunctionComponent = () => {
  const { projects, saveProject, removeProject, moveProject } = useStore();
  const toast = useToast();
  const [editing, setEditing] = useState<Editing>(null);

  const all = projects({
    includeHidden: true,
  });
  const shown = all.filter((project) => !project.hidden).length;

  const handleSave = useCallback(
    (draft: ProjectDraft) => {
      saveProject(draft);
      setEditing(null);
      toast("Project saved");
    },
    [saveProject, toast],
  );

  const handleAdd = useCallback(() => {
    setEditing({
      project: null,
    });
  }, []);

  const handleClose = useCallback(() => {
    setEditing(null);
  }, []);

  const handleEdit = useCallback(
    (project: Project) => () => {
      setEditing({
        project,
      });
    },
    [],
  );

  const handleToggle = useCallback(
    (project: Project) => () => {
      saveProject({
        id: project.id,
        hidden: !project.hidden,
      });
      toast(project.hidden ? "Shown on the site" : "Hidden from the site");
    },
    [saveProject, toast],
  );

  const handleRemove = useCallback(
    (project: Project) => () => {
      if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) {
        return;
      }
      removeProject(project.id);
      toast("Project deleted");
    },
    [removeProject, toast],
  );

  const handleMoveUp = useCallback(
    (project: Project) => () => {
      moveProject(project.id, -1);
    },
    [moveProject],
  );

  const handleMoveDown = useCallback(
    (project: Project) => () => {
      moveProject(project.id, 1);
    },
    [moveProject],
  );

  return (
    <React.Fragment>
      <Panel
        title="Projects"
        note={
          <React.Fragment>
            <span className={styles.num}>{shown}</span> shown on the site ·{" "}
            <span className={styles.num}>{all.length}</span> total
          </React.Fragment>
        }
        action={
          <Button size="sm" onClick={handleAdd}>
            Add project
          </Button>
        }
      >
        {all.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Add one and it will appear in the projects grid on the landing page."
          />
        ) : (
          all.map((project, index) => (
            <div
              className={styles.row}
              key={project.id}
              data-hidden={project.hidden ? "true" : "false"}
            >
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
                <Button
                  size="sm"
                  disabled={index === 0}
                  aria-label={`Move ${project.title} up`}
                  onClick={handleMoveUp(project)}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  disabled={index === all.length - 1}
                  aria-label={`Move ${project.title} down`}
                  onClick={handleMoveDown(project)}
                >
                  ↓
                </Button>
                <Button size="sm" onClick={handleToggle(project)}>
                  {project.hidden ? "Show" : "Hide"}
                </Button>
                <Button size="sm" onClick={handleEdit(project)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRemove(project)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </Panel>

      {/* Mounted only while open, so showModal() runs once per edit. */}
      {editing && (
        <ProjectDialog
          project={editing.project}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default ProjectsPanel;
