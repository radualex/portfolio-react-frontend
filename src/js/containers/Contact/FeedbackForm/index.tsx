import React, { useCallback, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import FormSuccess from "@/components/FormSuccess";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import { useToast } from "@/components/Toast/ToastContext";
import useFieldErrors from "@/hooks/useFieldErrors";
import { required } from "@/helpers/validators";
import { useStore } from "@/store/StoreContext";
import { BLANK, TOPICS } from "./constants";
import type { Key } from "./types";
import styles from "./styles.module.scss";

const FeedbackForm: React.FunctionComponent = () => {
  const { addMessage } = useStore();
  const toast = useToast();
  const [values, setValues] = useState<Record<Key, string>>(BLANK);
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  /* Only the note is required — a name would defeat anonymous feedback. */
  const { errors, check, recheck, checkAll, clear } = useFieldErrors<Key>({
    message: required(),
  });

  const field = (key: Key) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      addMessage({
        type: "feedback",
        name: values.name.trim() || "Anonymous",
        email: "",
        subject: values.topic,
        body: values.message.trim(),
        detail: "",
      });

      setSent(true);
      toast("Feedback saved to the admin inbox");
      requestAnimationFrame(() => success.current?.focus());
    },
    [addMessage, checkAll, toast, values],
  );

  const handleAgain = useCallback(() => {
    setValues(BLANK);
    clear();
    setSent(false);
    requestAnimationFrame(() => firstField.current?.focus());
  }, [clear]);

  if (sent) {
    return (
      <FormSuccess
        ref={success}
        label="Noted"
        action={
          <Button size="sm" onClick={handleAgain}>
            Leave another
          </Button>
        }
      >
        Thanks for taking the time.
      </FormSuccess>
    );
  }

  return (
    <form ref={form} onSubmit={handleSubmit} noValidate>
      <div className={styles.feedbackStack}>
        <TextField
          ref={firstField}
          id="fb-name"
          label="Name"
          optional
          type="text"
          autoComplete="name"
          placeholder="Anonymous"
          {...field("name")}
        />
        <SelectField
          id="fb-topic"
          label="About"
          options={TOPICS}
          {...field("topic")}
        />
        <TextAreaField
          id="fb-message"
          label="Your note"
          short
          {...field("message")}
        />
      </div>
      <Button className={styles.feedbackSubmit} type="submit">
        Leave feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
