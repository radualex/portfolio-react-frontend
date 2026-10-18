import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import classNames from "classnames";
import Button from "@/components/Button";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import useFieldErrors from "@/hooks/useFieldErrors";
import { required } from "@/helpers/validators";
import type { Project, ProjectDraft } from "@/store/types";
import { BLANK } from "./constants";
import type { Key } from "./types";
import styles from "./styles.module.scss";

export interface Props extends Omit<React.ComponentProps<"dialog">, "onClose"> {
  project: Project | null;
  onSave: (draft: ProjectDraft) => void;
  onClose: () => void;
}

const ProjectDialog: React.FunctionComponent<Props> = ({ project, onSave, onClose, className, ...props }) => {
  const classes = classNames(styles.root, className);
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const titleField = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<Record<Key, string>>(() =>
    project
      ? {
          title: project.title,
          kind: project.kind,
          description: project.description,
          stack: project.stack,
          linkLabel: project.linkLabel,
          link: project.link,
        }
      : BLANK,
  );

  const { errors, check, recheck, checkAll } = useFieldErrors<Key>({
    title: required("A project needs a title."),
    description: required("Describe it in a sentence or two."),
  });

  /* showModal() rather than the open attribute puts the dialog in the top layer and traps focus. */
  useEffect(() => {
    dialog.current?.showModal();
    titleField.current?.focus();
  }, []);

  const field = (key: Key) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
      recheck(key, event.target.value);
    },
    onBlur: () => check(key, values[key]),
    error: errors[key],
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!checkAll(values, form.current)) {
        return;
      }

      onSave({
        id: project?.id,
        title: values.title.trim(),
        kind: values.kind.trim(),
        description: values.description.trim(),
        stack: values.stack.trim(),
        linkLabel: values.linkLabel.trim(),
        link: values.link.trim(),
      });
    },
    [checkAll, onSave, project?.id, values],
  );

  return (
    /* Only onClose is wired: Escape fires onCancel then onClose, so handling both runs teardown twice. */
    <dialog
      className={classes}
      ref={dialog}
      aria-labelledby="dialog-title"
      onClose={onClose}
      {...props}
    >
      <form ref={form} onSubmit={handleSubmit} noValidate>
        <div className={styles.editorHead}>
          <h2 id="dialog-title">{project ? "Edit project" : "Add project"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className={styles.editorBody}>
          <TextField
            ref={titleField}
            id="pf-title"
            label="Title"
            type="text"
            {...field("title")}
          />
          <TextField
            id="pf-kind"
            label="Label"
            type="text"
            placeholder="Open source"
            {...field("kind")}
          />
          <TextAreaField
            id="pf-description"
            label="Description"
            full
            short
            {...field("description")}
          />
          <TextField
            id="pf-stack"
            label="Stack"
            type="text"
            placeholder="Node.js · TypeScript"
            {...field("stack")}
          />
          <TextField
            id="pf-linkLabel"
            label="Link label"
            type="text"
            placeholder="View on GitHub"
            {...field("linkLabel")}
          />
          <TextField
            id="pf-link"
            label="Link URL"
            type="url"
            full
            placeholder="https://github.com/radualex"
            {...field("link")}
          />
        </div>

        <div className={styles.editorFoot}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">
            Save project
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default ProjectDialog;
