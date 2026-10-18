/* A validator returns the message to show, or undefined when the value is fine. */
export type Validator = (value: string) => string | undefined;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const required =
  (message = "This one is required."): Validator =>
  (value) =>
    value.trim() ? undefined : message;

export const email =
  (message = "That address does not look complete."): Validator =>
  (value) => {
    const trimmed = value.trim();

    /* An empty field is required's problem, not this one's. */
    if (!trimmed) {
      return undefined;
    }

    return EMAIL.test(trimmed) ? undefined : message;
  };

export const all =
  (...validators: Validator[]): Validator =>
  (value) => {
    for (const validate of validators) {
      const problem = validate(value);

      if (problem) {
        return problem;
      }
    }

    return undefined;
  };
