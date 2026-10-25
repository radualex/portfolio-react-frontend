import React from 'react';
import classNames from 'classnames';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import EditableText from '@/components/EditableText';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'aside'> {}

const DirectChannels: React.FunctionComponent<Props> = ({ className, ...props }) => {
    const classes = classNames(styles.root, className);
    const { content } = useInlineEdit();
    const { contact } = content;

    return (
        <aside className={classes} {...props}>
            <h3 className={styles.channelsHeading}>
                <EditableText section={ContentSection.Contact} path="contact.channelsHeading" />
            </h3>
            <dl className={styles.channelList}>
                {contact.channels.map((channel, index) => {
                    const isExternal = Boolean(channel.href) && !channel.href?.startsWith('mailto:');
                    const target = isExternal ? '_blank' : undefined;
                    const related = isExternal ? 'noreferrer' : undefined;
                    const detail = (
                        <EditableText section={ContentSection.Contact} path={`contact.channels.${index}.detail`} />
                    );

                    return (
                        <div className={styles.channel} key={index}>
                            <dt>
                                <EditableText section={ContentSection.Contact} path={`contact.channels.${index}.term`} />
                            </dt>
                            <dd>
                                {channel.href ? (
                                    <a href={channel.href} target={target} rel={related}>
                                        {detail}
                                    </a>
                                ) : (
                                    detail
                                )}
                            </dd>
                        </div>
                    );
                })}
            </dl>

            <div className={styles.channelNote}>
                <p className={styles.channelNoteLabel}>
                    <EditableText section={ContentSection.Contact} path="contact.noteLabel" />
                </p>
                <ul>
                    {contact.note.map((_note, index) => {
                        return (
                            <li key={index}>
                                <EditableText section={ContentSection.Contact} path={`contact.note.${index}`} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default DirectChannels;
