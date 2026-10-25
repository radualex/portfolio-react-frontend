import React, { useCallback, useReducer } from 'react';

// Constants
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';
import type { ContentSection } from '@/admin/constants';

// Components
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import { useToast } from '@/components/Toast/ToastContext';

// Containers
import CapabilitiesSection from './CapabilitiesSection';
import ClosingCtaSection from './ClosingCtaSection';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import FooterSection from './FooterSection';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import ReferencesSection from './ReferencesSection';
import TrackRecordSection from './TrackRecordSection';

// Helpers
import { draftReducer } from './helpers';

// Store
import { useStore } from '@/store/StoreContext';

// Types
import type { SiteContent } from '@/store/types';

export interface Props extends Omit<React.ComponentProps<typeof Panel>, 'title' | 'note' | 'action' | 'children'> {
    section?: ContentSection;
    title?: string;
    onSaved?: () => void;
}

const ContentPanel: React.FunctionComponent<Props> = ({ section, title = 'Page content', onSaved, ...props }) => {
    const { state, setContent } = useStore();
    const toast = useToast();
    const [draft, updateDraft] = useReducer(draftReducer, state.content);

    const handleChangeHero = useCallback((patch: Partial<SiteContent['hero']>) => {
        updateDraft({
            key: 'hero',
            patch
        });
    }, []);

    const handleChangeCapabilities = useCallback((patch: Partial<SiteContent['capabilities']>) => {
        updateDraft({
            key: 'capabilities',
            patch
        });
    }, []);

    const handleChangeTrackRecord = useCallback((patch: Partial<SiteContent['trackRecord']>) => {
        updateDraft({
            key: 'trackRecord',
            patch
        });
    }, []);

    const handleChangeExperience = useCallback((patch: Partial<SiteContent['experience']>) => {
        updateDraft({
            key: 'experience',
            patch
        });
    }, []);

    const handleChangeProjects = useCallback((patch: Partial<SiteContent['projects']>) => {
        updateDraft({
            key: 'projects',
            patch
        });
    }, []);

    const handleChangeReferences = useCallback((patch: Partial<SiteContent['references']>) => {
        updateDraft({
            key: 'references',
            patch
        });
    }, []);

    const handleChangeClosingCta = useCallback((patch: Partial<SiteContent['closingCta']>) => {
        updateDraft({
            key: 'closingCta',
            patch
        });
    }, []);

    const handleChangeContact = useCallback((patch: Partial<SiteContent['contact']>) => {
        updateDraft({
            key: 'contact',
            patch
        });
    }, []);

    const handleChangeFooter = useCallback((patch: Partial<SiteContent['footer']>) => {
        updateDraft({
            key: 'footer',
            patch
        });
    }, []);

    const handleSave = useCallback(() => {
        setContent(draft);
        toast('Content saved');
        onSaved?.();
    }, [draft, onSaved, setContent, toast]);

    const actions = (
        <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={handleSave}>
            Save content
        </Button>
    );

    return (
        <Panel title={title} note="Every string on the public pages. Save to publish." action={actions} {...props}>
            <HeroSection active={section} value={draft.hero} onChange={handleChangeHero} />
            <CapabilitiesSection active={section} value={draft.capabilities} onChange={handleChangeCapabilities} />
            <TrackRecordSection active={section} value={draft.trackRecord} onChange={handleChangeTrackRecord} />
            <ExperienceSection active={section} value={draft.experience} onChange={handleChangeExperience} />
            <ProjectsSection active={section} value={draft.projects} onChange={handleChangeProjects} />
            <ReferencesSection active={section} value={draft.references} onChange={handleChangeReferences} />
            <ClosingCtaSection active={section} value={draft.closingCta} onChange={handleChangeClosingCta} />
            <ContactSection active={section} value={draft.contact} onChange={handleChangeContact} />
            <FooterSection active={section} value={draft.footer} onChange={handleChangeFooter} />
        </Panel>
    );
};

export default ContentPanel;
