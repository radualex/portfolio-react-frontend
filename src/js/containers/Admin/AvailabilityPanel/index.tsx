import React, { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import AvailabilityNote from "@/components/AvailabilityNote";
import Panel from "@/components/Panel";
import StatusPill from "@/components/StatusPill";
import TextField from "@/components/TextField";
import { useToast } from "@/components/Toast/ToastContext";
import { useStore } from "@/store/StoreContext";
import type { AvailabilityState } from "@/store/types";
import { LIMIT, STATES } from "./constants";
import styles from "./styles.module.scss";

const AvailabilityPanel: React.FunctionComponent = () => {
  const { state, setAvailability } = useStore();
  const toast = useToast();

  /* The note is a local draft so the public pages do not repaint on every keystroke. */
  const [note, setNote] = useState(state.availability.note);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  }, []);

  const handlePick = useCallback(
    (next: AvailabilityState) => {
      /* The state flip carries the current draft, so an unsaved note is not lost. */
      setAvailability({
        state: next,
        note,
      });
      toast(
        next === "available" ? "Shown as available" : "Shown as not available",
      );
    },
    [note, setAvailability, toast],
  );

  const handleSave = useCallback(() => {
    setAvailability({
      note,
    });
    toast("Note saved");
  }, [note, setAvailability, toast]);

  return (
    <Panel
      title="Availability"
      note="Drives the pill on every public page."
      action={
        <ButtonGroup
          label="Availability state"
          value={state.availability.state}
          options={STATES}
          onChange={handlePick}
        />
      }
    >
      <TextField
        id="availability-note"
        label="Line shown under the pill"
        type="text"
        maxLength={LIMIT}
        value={note}
        onChange={handleChange}
        hint={
          <React.Fragment>
            <span className={styles.num}>{note.length}</span>/{LIMIT}{" "}
            characters. Leave empty to show the pill on its own.
          </React.Fragment>
        }
      />

      <div className={styles.previewBox}>
        <p className={styles.previewLabel}>Live preview</p>
        {/* Fed the draft, not the store, so the preview is honest about what "Save note" publishes. */}
        <StatusPill
          availability={{
            state: state.availability.state,
            note,
          }}
        />
        <AvailabilityNote
          availability={{
            state: state.availability.state,
            note,
          }}
          className={styles.previewNote}
        />
      </div>

      <Button variant="primary" size="sm" onClick={handleSave}>
        Save note
      </Button>
    </Panel>
  );
};

export default AvailabilityPanel;
