import React from 'react';
import classNames from 'classnames';

// Constants
import { ContentSection } from '@/admin/constants';
import { ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Lead from '@/components/Lead';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'section'> {}

const ClosingCta: React.FunctionComponent<Props> = ({ className, ...props }) => {
    const classes = classNames(styles.root, className);
    const { state } = useStore();

    return (
        <Section className={classes} {...props}>
            <SectionEditButton target={ContentSection.ClosingCta} label="closing call to action" />
            <Container className={styles.ctaInner}>
                <h2>
                    <EditableText section={ContentSection.ClosingCta} path="closingCta.heading" />
                </h2>
                <Lead className={styles.ctaLead}>
                    <EditableText section={ContentSection.ClosingCta} path="closingCta.lead" />
                </Lead>
                <p className={styles.ctaNote}>{state.availability.note}</p>
                <Button variant={ButtonVariant.Primary} to="/contact">
                    <EditableText section={ContentSection.ClosingCta} path="closingCta.ctaLabel" />
                </Button>
            </Container>
        </Section>
    );
};

export default ClosingCta;
