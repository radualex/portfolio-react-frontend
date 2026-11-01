import React from 'react';

// Components
import PageFooter from '@/components/PageFooter';
import SkipLink from '@/components/SkipLink';
import TopNav from '@/components/TopNav';

// Containers
import Capabilities from '@/containers/Home/Capabilities';
import ClosingCta from '@/containers/Home/ClosingCta';
import Experience from '@/containers/Home/Experience';
import Hero from '@/containers/Home/Hero';
import Projects from '@/containers/Home/Projects';
import References from '@/containers/Home/References';
import TrackRecord from '@/containers/Home/TrackRecord';

// Hooks
import usePageMeta from '@/hooks/usePageMeta';

// Store
import { useStore } from '@/store/StoreContext';

const Home: React.FunctionComponent = () => {
    const { state } = useStore();

    usePageMeta({
        title: 'Radu Stoica — Freelance software engineer, Delft',
        description:
      'Freelance React and TypeScript engineer in Delft. Ten years of production frontend work for ASML, Cytosmart, Yellowtail, ING and Wärtsilä.'
    });

    return (
        <React.Fragment>
            <SkipLink />
            <TopNav />
            <main id="content">
                {state.sections.hero && <Hero />}
                {state.sections.capabilities && <Capabilities />}
                {state.sections.trackRecord && <TrackRecord />}
                {state.sections.experience && <Experience />}
                {state.sections.projects && <Projects />}
                {state.sections.references && <References />}
                {state.sections.closingCta && <ClosingCta />}
            </main>
            {state.sections.footer && <PageFooter />}
        </React.Fragment>
    );
};

export default Home;
