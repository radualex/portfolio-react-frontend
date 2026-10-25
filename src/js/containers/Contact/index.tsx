import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import AvailabilityBlock from '@/components/AvailabilityBlock';
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Lead from '@/components/Lead';
import PageFooter from '@/components/PageFooter';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import SkipLink from '@/components/SkipLink';
import TopNav from '@/components/TopNav';

// Containers
import DirectChannels from '@/containers/Contact/DirectChannels';
import EnquiryForm from '@/containers/Contact/EnquiryForm';
import FeedbackForm from '@/containers/Contact/FeedbackForm';

// Hooks
import usePageMeta from '@/hooks/usePageMeta';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.scss';

const Contact: React.FunctionComponent = () => {
    const { state } = useStore();

    usePageMeta({
        title: 'Contact for work — Radu Stoica',
        description: 'Brief Radu Stoica on a project: freelance React and TypeScript engineering from Delft.'
    });

    return (
        <React.Fragment>
            <SkipLink />
            <TopNav />
            <main id="content">
                {state.sections.contactHero && (
                    <Section hero className={styles.hero}>
                        <SectionEditButton target={ContentSection.Contact} label="contact page" />
                        <Container>
                            <Eyebrow>
                                <EditableText section={ContentSection.Contact} path="contact.eyebrow" />
                            </Eyebrow>
                            <h1 className={styles.heroHeading}>
                                <EditableText section={ContentSection.Contact} path="contact.heading" />
                            </h1>
                            <Lead className={styles.heroLead}>
                                <EditableText section={ContentSection.Contact} path="contact.lead" />
                            </Lead>
                            <AvailabilityBlock />
                        </Container>
                    </Section>
                )}

                {state.sections.contactEnquiry && (
                    <Section>
                        <SectionEditButton target={ContentSection.Contact} label="contact page" />
                        <Container className={styles.split}>
                            <div>
                                <h2 className={styles.formHeading}>
                                    <EditableText section={ContentSection.Contact} path="contact.enquiryHeading" />
                                </h2>
                                <EnquiryForm />
                            </div>
                            <DirectChannels />
                        </Container>
                    </Section>
                )}

                {state.sections.contactFeedback && (
                    <Section>
                        <SectionEditButton target={ContentSection.Contact} label="contact page" />
                        <Container className={styles.split}>
                            <div className={styles.feedbackIntro}>
                                <Eyebrow quiet>
                                    <EditableText section={ContentSection.Contact} path="contact.feedbackEyebrow" />
                                </Eyebrow>
                                <h2>
                                    <EditableText section={ContentSection.Contact} path="contact.feedbackHeading" />
                                </h2>
                                <p>
                                    <EditableText section={ContentSection.Contact} path="contact.feedbackBody" />
                                </p>
                            </div>
                            <div>
                                <FeedbackForm />
                            </div>
                        </Container>
                    </Section>
                )}
            </main>
            {state.sections.footer && <PageFooter firstLink="home" />}
        </React.Fragment>
    );
};

export default Contact;
