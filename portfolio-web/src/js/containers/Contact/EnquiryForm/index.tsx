import React, { useCallback, useRef, useState, type ChangeEvent } from 'react';

// Constants
import { BLANK, BUDGETS, Key, KINDS, TIMELINES } from './constants';
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';
import { MessageType } from '@/store/constants';

// Components
import Button from '@/components/Button';
import FormActions from '@/components/FormActions';
import FormGrid from '@/components/FormGrid';
import FormSuccess from '@/components/FormSuccess';
import SelectField from '@/components/SelectField';
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';
import { useToast } from '@/components/Toast/ToastContext';

// Helpers
import { all, email, required } from '@/helpers/validators';

// Hooks
import useFieldErrors from '@/hooks/useFieldErrors';

// Store
import { useStore } from '@/store/StoreContext';

export interface Props extends React.ComponentProps<'form'> {}

const EnquiryForm: React.FunctionComponent<Props> = ({ ...props }) => {
    const { addMessage } = useStore();
    const toast = useToast();
    const [values, setValues] = useState<Record<Key, string>>(BLANK);
    const [isSent, setIsSent] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    const { errors, check, recheck, checkAll, clear } = useFieldErrors<Key>({
        name: required(),
        email: all(required(), email()),
        message: required()
    });

    const getField = (key: Key) => {
        return {
            value: values[key],
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                setValues((current) => {
                    return {
                        ...current,
                        [key]: event.target.value
                    };
                });
                recheck(key, event.target.value);
            },
            onBlur: () => {
                return check(key, values[key]);
            },
            error: errors[key]
        };
    };

    const handleSubmit = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!checkAll(values, formRef.current)) {
            return;
        }

        addMessage({
            type: MessageType.Enquiry,
            name: values.name.trim(),
            email: values.email.trim(),
            subject: values.kind,
            body: values.message.trim(),
            detail: [
                values.company.trim()
                    ? `Company: ${values.company.trim()}`
                    : '',
                `Budget: ${values.budget}`,
                `Timeline: ${values.timeline}`
            ]
                .filter(Boolean)
                .join(' · ')
        });

        setIsSent(true);
        toast('Enquiry saved to the admin inbox');

        requestAnimationFrame(() => {
            return successRef.current?.focus();
        });
    }, [addMessage, checkAll, toast, values]);

    const handleAgain = useCallback(() => {
        setValues(BLANK);
        clear();
        setIsSent(false);
        requestAnimationFrame(() => {
            return firstFieldRef.current?.focus();
        });
    }, [clear]);

    const actions = (
        <Button size={ButtonSize.Sm} onClick={handleAgain}>
            Send another
        </Button>
    );

    if (isSent) {
        return (
            <FormSuccess ref={successRef} label="Enquiry received" action={actions}>
                Thanks — your brief is in. It is sitting in the admin inbox of
                this prototype rather than being emailed anywhere.
            </FormSuccess>
        );
    }

    return (
        <form {...props} ref={formRef} onSubmit={handleSubmit} noValidate>
            <FormGrid>
                <TextField ref={firstFieldRef} id="eq-name" label="Your name" type="text" autoComplete="name" {...getField(Key.Name)} />
                <TextField id="eq-email" label="Email" type="email" autoComplete="email" {...getField(Key.Email)} />
                <TextField id="eq-company" label="Company" optional type="text" autoComplete="organization" {...getField(Key.Company)} />
                <SelectField id="eq-kind" label="What kind of work" options={KINDS} {...getField(Key.Kind)} />
                <SelectField id="eq-budget" label="Indicative budget" options={BUDGETS} {...getField(Key.Budget)} />
                <SelectField id="eq-timeline" label="When do you need it" options={TIMELINES} {...getField(Key.Timeline)} />
                <TextAreaField id="eq-message" label="The brief" full placeholder="What are you building, what's blocking it, and who is already on the team?" {...getField(Key.Message)} />
            </FormGrid>

            <FormActions note="Prototype — messages are stored in this browser and appear in the admin inbox.">
                <Button variant={ButtonVariant.Primary} type="submit">
                    Send enquiry
                </Button>
            </FormActions>
        </form>
    );
};

export default EnquiryForm;
