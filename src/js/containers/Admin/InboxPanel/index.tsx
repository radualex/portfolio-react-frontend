import React, { useCallback, useState } from "react";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import type { GroupOption } from "@/components/ButtonGroup/types";
import EmptyState from "@/components/EmptyState";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";
import { useToast } from "@/components/Toast/ToastContext";
import { useStore } from "@/store/StoreContext";
import { formatDate } from "@/store/storage";
import type { Message, MessageFilter } from "@/store/types";
import styles from "./styles.module.scss";

const InboxPanel: React.FunctionComponent = () => {
  const { state, updateMessage, removeMessage } = useStore();
  const toast = useToast();
  const [filter, setFilter] = useState<MessageFilter>("all");

  const inbox = state.inbox;
  const live = inbox.filter((message) => !message.archived);

  /* The three live tabs count unarchived messages; Archived counts the rest. */
  const counts: Record<MessageFilter, number> = {
    all: live.length,
    enquiry: live.filter((message) => message.type === "enquiry").length,
    feedback: live.filter((message) => message.type === "feedback").length,
    archived: inbox.filter((message) => message.archived).length,
  };

  const options: ReadonlyArray<GroupOption<MessageFilter>> = [
    {
      value: "all",
      label: "All",
      count: counts.all,
    },
    {
      value: "enquiry",
      label: "Enquiries",
      count: counts.enquiry,
    },
    {
      value: "feedback",
      label: "Feedback",
      count: counts.feedback,
    },
    {
      value: "archived",
      label: "Archived",
      count: counts.archived,
    },
  ];

  const shown =
    filter === "archived"
      ? inbox.filter((message) => message.archived)
      : live.filter((message) => filter === "all" || message.type === filter);

  const handleToggleRead = useCallback(
    (message: Message) => () => {
      updateMessage(message.id, {
        read: !message.read,
      });
    },
    [updateMessage],
  );

  const handleArchive = useCallback(
    (message: Message) => () => {
      /* Archiving implies it has been dealt with, so it is marked read too. */
      updateMessage(message.id, {
        archived: !message.archived,
        read: true,
      });
      toast(message.archived ? "Restored to the inbox" : "Archived");
    },
    [toast, updateMessage],
  );

  const handleRemove = useCallback(
    (message: Message) => () => {
      if (!confirm("Delete this message permanently?")) {
        return;
      }
      removeMessage(message.id);
      toast("Message deleted");
    },
    [removeMessage, toast],
  );

  return (
    <Panel
      title="Inbox"
      note="Project enquiries and site feedback."
      action={
        <ButtonGroup
          label="Filter messages"
          variant="tabs"
          value={filter}
          options={options}
          onChange={setFilter}
        />
      }
    >
      {shown.length === 0 ? (
        <EmptyState
          title="Nothing here"
          description={
            filter === "archived"
              ? "Archived messages will collect here once you file something away."
              : "Enquiries and feedback submitted from the contact page land in this list."
          }
        />
      ) : (
        shown.map((message) => (
          <article
            className={styles.msg}
            key={message.id}
            data-read={message.read ? "true" : "false"}
          >
            <div className={styles.msgHead}>
              <strong>
                {message.name}{" "}
                <Tag>{message.type === "enquiry" ? "Enquiry" : "Feedback"}</Tag>
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
                  "no address given"
                )}
              </span>
              <Button size="sm" onClick={handleToggleRead(message)}>
                {message.read ? "Mark unread" : "Mark read"}
              </Button>
              <Button size="sm" onClick={handleArchive(message)}>
                {message.archived ? "Restore" : "Archive"}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleRemove(message)}
              >
                Delete
              </Button>
            </div>
          </article>
        ))
      )}
    </Panel>
  );
};

export default InboxPanel;
