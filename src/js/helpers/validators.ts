// Constants
import { EMAIL } from './constants';

// Types
import type { Validator } from './types';

export const required = (message = 'This one is required.'): Validator => {
    return (value) => {
        return value.trim() ? undefined : message;
    };
};

export const email = (message = 'That address does not look complete.'): Validator => {
    return (value) => {
        const trimmed = value.trim();

        if (!trimmed) {
            return;
        }

        return EMAIL.test(trimmed) ? undefined : message;
    };
};

export const all = (...validators: Validator[]): Validator => {
    return (value) => {
        for (const validate of validators) {
            const problem = validate(value);

            if (problem) {
                return problem;
            }
        }

        return;
    };
};
