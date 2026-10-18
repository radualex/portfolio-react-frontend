import { useState } from "react";
import type { Validator } from "@/helpers/validators";

const useFieldErrors = <K extends string>(
  validators: Partial<Record<K, Validator>>,
) => {
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({});

  const set = (key: K, message: string | undefined) =>
    setErrors((current) => ({
      ...current,
      [key]: message,
    }));

  const check = (key: K, value: string) => {
    const problem = validators[key]?.(value);

    set(key, problem);

    return !problem;
  };

  const recheck = (key: K, value: string) => {
    if (!errors[key]) {
      return;
    }

    check(key, value);
  };

  const checkAll = (values: Record<K, string>, form: HTMLFormElement | null) => {
    const next: Partial<Record<K, string>> = {};
    let ok = true;

    for (const key of Object.keys(validators) as K[]) {
      const problem = validators[key]?.(values[key] ?? "");

      if (problem) {
        next[key] = problem;
        ok = false;
      }
    }

    setErrors(next);

    /* aria-invalid lands on the next paint, so the focus move has to wait for it. */
    if (!ok && form) {
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
    }

    return ok;
  };

  const clear = () => setErrors({});

  return {
    errors,
    check,
    recheck,
    checkAll,
    clear,
  };
};

export default useFieldErrors;
