import { useState } from 'react';

// Types
import type { Validator } from '@/helpers/types';

const useFieldErrors = <K extends string>(validators: Partial<Record<K, Validator>>) => {
    const [errors, setErrors] = useState<Partial<Record<K, string>>>({});

    const set = (key: K, message: string | undefined) => {
        setErrors((current) => {
            return {
                ...current,
                [key]: message
            };
        });
    };

    const check = (key: K, value: string) => {
        const problem = validators[key]?.(value);

        set(key, problem);

        return !problem;
    };

    const recheck = (key: K, value: string) => {
        const message = errors[key];

        if (!message) {
            return;
        }

        check(key, value);
    };

    const checkAll = (values: Record<K, string>, form: HTMLFormElement | null) => {
        const next: Partial<Record<K, string>> = {};
        let isOk = true;

        for (const key of Object.keys(validators) as K[]) {
            const problem = validators[key]?.(values[key]);

            if (problem) {
                next[key] = problem;
                isOk = false;
            }
        }

        setErrors(next);

        if (!isOk && form) {
            requestAnimationFrame(() => {
                form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
            });
        }

        return isOk;
    };

    const clear = () => {
        setErrors({});
    };

    return {
        errors,
        check,
        recheck,
        checkAll,
        clear
    };
};

export default useFieldErrors;
