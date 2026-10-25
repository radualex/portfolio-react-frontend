import React, { type ChangeEvent } from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Containers
import Group from '../Group';

// Helpers
import { fieldPatch, toList } from '../helpers';

// Styles
import styles from '../styles.module.scss';

// Types
import type { ChannelItem, SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type ContactContent = SiteContent['contact'];

export interface Props {
    active?: ContentSection;
    value: ContactContent;
    onChange: (patch: Partial<ContactContent>) => void;
}

const ContactSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<ContactContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    const handleNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            note: toList(event.target.value)
        });
    };

    const handleChannel = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as TextKey<ChannelItem>;
        const patch = fieldPatch(field, event.target.value);

        onChange({
            channels: value.channels.map((channel, position) => {
                return position === index ? {
                    ...channel,
                    ...patch
                } : channel;
            })
        });
    };

    return (
        <Group active={active} name={ContentSection.Contact}>
            <h3>Contact</h3>
            <div className={styles.fields}>
                <TextField id="content-contact-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-contact-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextAreaField id="content-contact-lead" label="Lead" full rows={3} value={value.lead} onChange={handleField.bind(undefined, 'lead')} />
                <TextField id="content-contact-enquiryHeading" label="Enquiry heading" type="text" value={value.enquiryHeading} onChange={handleField.bind(undefined, 'enquiryHeading')} />
                <TextField id="content-contact-feedbackEyebrow" label="Feedback eyebrow" type="text" value={value.feedbackEyebrow} onChange={handleField.bind(undefined, 'feedbackEyebrow')} />
                <TextField id="content-contact-feedbackHeading" label="Feedback heading" type="text" value={value.feedbackHeading} onChange={handleField.bind(undefined, 'feedbackHeading')} />
                <TextAreaField id="content-contact-feedbackBody" label="Feedback body" full rows={3} value={value.feedbackBody} onChange={handleField.bind(undefined, 'feedbackBody')} />
                <TextField id="content-contact-channelsHeading" label="Channels heading" type="text" value={value.channelsHeading} onChange={handleField.bind(undefined, 'channelsHeading')} />
                <TextField id="content-contact-noteLabel" label="Note label" type="text" value={value.noteLabel} onChange={handleField.bind(undefined, 'noteLabel')} />
                <TextAreaField id="content-contact-note" label="Note" full rows={5} value={value.note.join('\n')} onChange={handleNote} hint="One entry per line." />
            </div>

            <div className={styles.items}>
                {value.channels.map((channel, index) => {
                    return (
                        <div className={styles.item} key={`channel-${index}`}>
                            <div className={styles.fields}>
                                <TextField id={`content-channel-${index}-term`} label="Term" type="text" name="term" value={channel.term} onChange={handleChannel.bind(undefined, index)} />
                                <TextField id={`content-channel-${index}-detail`} label="Detail" type="text" name="detail" value={channel.detail} onChange={handleChannel.bind(undefined, index)} />
                                <TextField id={`content-channel-${index}-href`} label="Link" type="text" name="href" full value={channel.href ?? ''} onChange={handleChannel.bind(undefined, index)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Group>
    );
};

export default ContactSection;
