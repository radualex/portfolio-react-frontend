import React, { useCallback, useMemo, useState } from 'react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';
import { ButtonGroupVariant } from '@/components/ButtonGroup/constants';
import { MessageFilter, MessageType } from '@/store/constants';

// Components
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import EmptyState from '@/components/EmptyState';
import Panel from '@/components/Panel';
import Tag from '@/components/Tag';
import { useToast } from '@/components/Toast/ToastContext';

// Store
import { formatDate } from '@/store/storage';
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

// Types
import type { GroupOption } from '@/components/ButtonGroup/types';
import type { Message } from '@/store/types';

export interface Props extends Omit<React.ComponentProps<typeof Panel>, 'title' | 'note' | 'action' | 'children'> {}

const InboxPanel: React.FunctionComponent<Props> = (props) => {
    const { state, updateMessage, removeMessage } = useStore();
    const toast = useToast();
    const [filter, setFilter] = useState<MessageFilter>(MessageFilter.All);

    const inbox = state.inbox;
    const live = inbox.filter((message) => {
        return !message.archived;
    });

    const counts: Record<MessageFilter, number> = useMemo(() => {
        return {
            all: live.length,
            enquiry: live.filter((message) => {
                return message.type === MessageType.Enquiry;
            }).length,
            feedback: live.filter((message) => {
                return message.type === MessageType.Feedback;
            }).length,
            archived: inbox.filter((message) => {
                return message.archived;
            }).length
        };
    }, [inbox, live]);

    const options: readonly GroupOption<MessageFilter>[] = useMemo(() => {
        return [{
            value: MessageFilter.All,
            label: 'All',
            count: counts.all
        }, {
            value: MessageFilter.Enquiry,
            label: 'Enquiries',
            count: counts.enquiry
        }, {
            value: MessageFilter.Feedback,
            label: 'Feedback',
            count: counts.feedback
        }, {
            value: MessageFilter.Archived,
            label: 'Archived',
            count: counts.archived
        }];
    }, [counts]);

    const handleFilter = useCallback((next: MessageFilter) => {
        const picked = options.find((option) => {
            return option.value === next;
        })?.value;

        if (picked !== undefined) {
            setFilter(picked);
        }
    }, [options]);

    const matchesFilter = (message: Message) => {
        if (filter === MessageFilter.All) {
            return true;
        }

        if (filter === MessageFilter.Enquiry) {
            return message.type === MessageType.Enquiry;
        }

        return message.type === MessageType.Feedback;
    };

    const shown = filter === MessageFilter.Archived ? inbox.filter((message) => {
        return message.archived;
    }) : live.filter((message) => {
        return matchesFilter(message);
    });

    const handleToggleRead = useCallback((message: Message) => {
        updateMessage(message.id, {
            read: !message.read
        });
    }, [updateMessage]);

    const handleArchive = useCallback((message: Message) => {
        updateMessage(message.id, {
            archived: !message.archived,
            read: true
        });
        toast(message.archived ? 'Restored to the inbox' : 'Archived');
    }, [toast, updateMessage]);

    const handleRemove = useCallback((message: Message) => {
        if (!confirm('Delete this message permanently?')) {
            return;
        }
        removeMessage(message.id);
        toast('Message deleted');
    }, [removeMessage, toast]);

    const isEmpty = shown.length === 0;
    const emptyDescription = filter === MessageFilter.Archived ? 'Archived messages will collect here once you file something away.' : 'Enquiries and feedback submitted from the contact page land in this list.';
    const actions = (
        <ButtonGroup label="Filter messages" variant={ButtonGroupVariant.Tabs} value={filter} options={options} onChange={handleFilter} />
    );
    const rows = shown.map((message) => {
        return (
            <article className={styles.msg} key={message.id} data-read={message.read ? 'true' : 'false'}>
                <div className={styles.msgHead}>
                    <strong>
                        {message.name} <Tag>{message.type === MessageType.Enquiry ? 'Enquiry' : 'Feedback'}</Tag>
                    </strong>
                    <span className={styles.msgDate}>{formatDate(message.at)}</span>
                </div>

                <p className={styles.msgSubject}>
                    {message.subject}
                    {message.detail && ` · ${message.detail}`}
                </p>
                <p className={styles.msgBody}>{message.body}</p>

                <div className={styles.msgActions}>
                    <span className={styles.msgFrom}>
                        {message.email ? (
                            <a href={`mailto:${message.email}`}>{message.email}</a>
                        ) : (
                            'no address given'
                        )}
                    </span>
                    <Button size={ButtonSize.Sm} onClick={handleToggleRead.bind(undefined, message)}>
                        {message.read ? 'Mark unread' : 'Mark read'}
                    </Button>
                    <Button size={ButtonSize.Sm} onClick={handleArchive.bind(undefined, message)}>
                        {message.archived ? 'Restore' : 'Archive'}
                    </Button>
                    <Button variant={ButtonVariant.Danger} size={ButtonSize.Sm} onClick={handleRemove.bind(undefined, message)}>
                        Delete
                    </Button>
                </div>
            </article>
        );
    });

    return (
        <Panel {...props} title="Inbox" note="Project enquiries and site feedback." action={actions}>
            {isEmpty ? <EmptyState title="Nothing here" description={emptyDescription} /> : rows}
        </Panel>
    );
};

export default InboxPanel;
