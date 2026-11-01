import React, { useCallback, useRef, useState, type ChangeEvent } from 'react';

// Constants
import { BLANK, Key, TOPICS } from './constants';
import { ButtonSize } from '@/components/Button/constants';
import { MessageType } from '@/store/constants';

// Components
import Button from '@/components/Button';
import FormSuccess from '@/components/FormSuccess';
import SelectField from '@/components/SelectField';
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';
import { useToast } from '@/components/Toast/ToastContext';

// Helpers
import { required } from '@/helpers/validators';

// Hooks
import useFieldErrors from '@/hooks/useFieldErrors';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'form'> {}

const FeedbackForm: React.FunctionComponent<Props> = ({ ...props }) => {
    const { addMessage } = useStore();
    const toast = useToast();
    const [values, setValues] = useState<Record<Key, string>>(BLANK);
    const [isSent, setIsSent] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    const { errors, check, recheck, checkAll, clear } = useFieldErrors<Key>({
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
            type: MessageType.Feedback,
            name: values.name.trim() || 'Anonymous',
            email: '',
            subject: values.topic,
            body: values.message.trim(),
            detail: ''
        });

        setIsSent(true);
        toast('Feedback saved to the admin inbox');
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
            Leave another
        </Button>
    );

    if (isSent) {
        return (
            <FormSuccess ref={successRef} label="Noted" action={actions}>
                Thanks for taking the time.
            </FormSuccess>
        );
    }

    return (
        <form {...props} ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className={styles.feedbackStack}>
                <TextField ref={firstFieldRef} id="fb-name" label="Name" optional type="text" autoComplete="name" placeholder="Anonymous" {...getField(Key.Name)} />
                <SelectField id="fb-topic" label="About" options={TOPICS} {...getField(Key.Topic)} />
                <TextAreaField id="fb-message" label="Your note" short {...getField(Key.Message)} />
            </div>
            <Button className={styles.feedbackSubmit} type="submit">
                Leave feedback
            </Button>
        </form>
    );
};

export default FeedbackForm;
