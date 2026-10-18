import React from "react";
import AvailabilityBlock from "@/components/AvailabilityBlock";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Lead from "@/components/Lead";
import PageFooter from "@/components/PageFooter";
import Section from "@/components/Section";
import SkipLink from "@/components/SkipLink";
import TopNav from "@/components/TopNav";
import DirectChannels from "@/containers/Contact/DirectChannels";
import EnquiryForm from "@/containers/Contact/EnquiryForm";
import FeedbackForm from "@/containers/Contact/FeedbackForm";
import usePageMeta from "@/hooks/usePageMeta";
import styles from "./styles.module.scss";

const Contact: React.FunctionComponent = () => {
  usePageMeta({
    title: "Contact for work — Radu Stoica",
    description: "Brief Radu Stoica on a project: freelance React and TypeScript engineering from Amsterdam.",
  });

  return (
    <React.Fragment>
      <SkipLink />
      <TopNav />
      <main id="content">
        <Section hero className={styles.hero}>
          <Container>
            {/* The second and last accent eyebrow on the site. */}
            <Eyebrow>Contact for work</Eyebrow>
            <h1 className={styles.heroHeading}>Tell me what you're building.</h1>
            <Lead className={styles.heroLead}>
              The more concrete the brief, the more useful my first reply will
              be. I read every message myself — there is no agency inbox in
              between.
            </Lead>
            <AvailabilityBlock />
          </Container>
        </Section>

        <Section>
          <Container className={styles.split}>
            <div>
              <h2 className={styles.formHeading}>Project enquiry</h2>
              <EnquiryForm />
            </div>
            <DirectChannels />
          </Container>
        </Section>

        <Section>
          <Container className={styles.split}>
            <div className={styles.feedbackIntro}>
              <Eyebrow quiet>Feedback</Eyebrow>
              <h2>Not hiring, but have a note?</h2>
              <p>
                Something broken, something unclear, an opinion on the work — it
                all lands in the same place and I read it.
              </p>
            </div>
            <div>
              <FeedbackForm />
            </div>
          </Container>
        </Section>
      </main>
      <PageFooter firstLink="home" />
    </React.Fragment>
  );
};

export default Contact;
