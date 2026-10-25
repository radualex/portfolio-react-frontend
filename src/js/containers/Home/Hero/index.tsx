import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';
import { ButtonVariant } from '@/components/Button/constants';
import { PORTRAIT } from './constants';

// Components
import AvailabilityBlock from '@/components/AvailabilityBlock';
import Button from '@/components/Button';
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Lead from '@/components/Lead';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';

// Store
import { CV_PATH } from '@/store/defaults';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'section'> {}

const Hero: React.FunctionComponent<Props> = ({ ...props }) => {
    return (
        <Section hero {...props}>
            <SectionEditButton target={ContentSection.Hero} label="hero" />
            <Container className={styles.heroSplit}>
                <div>
                    <Eyebrow>
                        <EditableText section={ContentSection.Hero} path="hero.eyebrow" />
                    </Eyebrow>
                    <h1 className={styles.heroHeading}>
                        <EditableText section={ContentSection.Hero} path="hero.heading" />
                    </h1>
                    <Lead>
                        <EditableText section={ContentSection.Hero} path="hero.lead" />
                    </Lead>

                    <AvailabilityBlock />

                    <div className={styles.heroCta}>
                        <Button variant={ButtonVariant.Primary} to="/contact">
                            <EditableText section={ContentSection.Hero} path="hero.primaryCta" />
                        </Button>
                        <Button arrow href={CV_PATH} target="_blank" rel="noopener">
                            <EditableText section={ContentSection.Hero} path="hero.cvCta" />
                        </Button>
                    </div>
                </div>

                <figure className={styles.portrait}>
                    <img src={PORTRAIT} width="720" height="720" alt="Radu Alexandru Stoica" />
                    <figcaption>
                        <EditableText section={ContentSection.Hero} path="hero.location" />
                    </figcaption>
                </figure>
            </Container>
        </Section>
    );
};

export default Hero;
