import React, { useCallback, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import FormActions from "@/components/FormActions";
import FormGrid from "@/components/FormGrid";
import FormSuccess from "@/components/FormSuccess";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import { useToast } from "@/components/Toast/ToastContext";
import useFieldErrors from "@/hooks/useFieldErrors";
import { all, email, required } from "@/helpers/validators";
import { useStore } from "@/store/StoreContext";
import { BLANK, BUDGETS, KINDS, TIMELINES } from "./constants";
import type { Key } from "./types";

const EnquiryForm: React.FunctionComponent = () => {
  const { addMessage } = useStore();
  const toast = useToast();
  const [values, setValues] = useState<Record<Key, string>>(BLANK);
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  const { errors, check, recheck, checkAll, clear } = useFieldErrors<Key>({
    name: required(),
    email: all(required(), email()),
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
        type: "enquiry",
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.kind,
        body: values.message.trim(),
        detail: [
          values.company.trim() ? `Company: ${values.company.trim()}` : "",
          `Budget: ${values.budget}`,
          `Timeline: ${values.timeline}`,
        ]
          .filter(Boolean)
          .join(" · "),
      });

      setSent(true);
      toast("Enquiry saved to the admin inbox");
      /* The success panel has to exist before it can take focus. */
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
        label="Enquiry received"
        action={
          <Button size="sm" onClick={handleAgain}>
            Send another
          </Button>
        }
      >
        Thanks — your brief is in. It is sitting in the admin inbox of this
        prototype rather than being emailed anywhere.
      </FormSuccess>
    );
  }

  return (
    <form ref={form} onSubmit={handleSubmit} noValidate>
      <FormGrid>
        <TextField
          ref={firstField}
          id="eq-name"
          label="Your name"
          type="text"
          autoComplete="name"
          {...field("name")}
        />
        <TextField
          id="eq-email"
          label="Email"
          type="email"
          autoComplete="email"
          {...field("email")}
        />
        <TextField
          id="eq-company"
          label="Company"
          optional
          type="text"
          autoComplete="organization"
          {...field("company")}
        />
        <SelectField
          id="eq-kind"
          label="What kind of work"
          options={KINDS}
          {...field("kind")}
        />
        <SelectField
          id="eq-budget"
          label="Indicative budget"
          options={BUDGETS}
          {...field("budget")}
        />
        <SelectField
          id="eq-timeline"
          label="When do you need it"
          options={TIMELINES}
          {...field("timeline")}
        />
        <TextAreaField
          id="eq-message"
          label="The brief"
          full
          placeholder="What are you building, what's blocking it, and who is already on the team?"
          {...field("message")}
        />
      </FormGrid>

      <FormActions note="Prototype — messages are stored in this browser and appear in the admin inbox.">
        <Button variant="primary" type="submit">
          Send enquiry
        </Button>
      </FormActions>
    </form>
  );
};

export default EnquiryForm;
