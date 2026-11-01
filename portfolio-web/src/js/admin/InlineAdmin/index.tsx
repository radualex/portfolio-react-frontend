import React from 'react';

// Constants
import { TITLES } from './constants';
import { ContentSection, EditorTarget, SECTION_BY_EDITOR_TARGET } from '@/admin/constants';

// Components
import AdminDialog from '@/admin/AdminDialog';

// Containers
import AvailabilityPanel from '@/containers/Admin/AvailabilityPanel';
import ContentPanel from '@/containers/Admin/ContentPanel';
import InboxPanel from '@/containers/Admin/InboxPanel';
import ProjectsPanel from '@/containers/Admin/ProjectsPanel';
import SectionsPanel from '@/containers/Admin/SectionsPanel';

export interface Props extends Omit<React.ComponentProps<typeof AdminDialog>, 'title' | 'onClose' | 'children'> {
    editor: EditorTarget | undefined;
    onClose: () => void;
}

const InlineAdmin: React.FunctionComponent<Props> = ({ editor, onClose, ...props }) => {
    if (!editor) {
        return;
    }

    return (
        <AdminDialog title={TITLES[editor]} onClose={onClose} {...props}>
            {editor === EditorTarget.Sections && <SectionsPanel />}

            {editor === EditorTarget.Availability && <AvailabilityPanel />}

            {editor === EditorTarget.Content && <ContentPanel onSaved={onClose} />}

            {editor === EditorTarget.Inbox && <InboxPanel />}

            {editor === EditorTarget.Hero && (
                <ContentPanel section={ContentSection.Hero} title="Hero copy" onSaved={onClose} />
            )}

            {editor === EditorTarget.Projects && (
                <React.Fragment>
                    <ContentPanel section={ContentSection.Projects} title="Projects copy" onSaved={onClose} />
                    <ProjectsPanel />
                </React.Fragment>
            )}

            {editor !== EditorTarget.Sections
                && editor !== EditorTarget.Availability
                && editor !== EditorTarget.Content
                && editor !== EditorTarget.Inbox
                && editor !== EditorTarget.Hero
                && editor !== EditorTarget.Projects && (
                <ContentPanel section={SECTION_BY_EDITOR_TARGET[editor]} title="Section copy" onSaved={onClose} />
            )}
        </AdminDialog>
    );
};

export default InlineAdmin;
