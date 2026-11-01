// Constants
import { SectionKey } from '@/store/constants';

// Types
import type { SectionMeta } from './types';

export const SECTIONS: readonly SectionMeta[] = [{
    key: SectionKey.Hero,
    label: 'Hero',
    description: 'Landing page opening'
},
{
    key: SectionKey.Capabilities,
    label: 'Approach',
    description: 'Capabilities and working stack'
},
{
    key: SectionKey.TrackRecord,
    label: 'Track record',
    description: 'The stat strip'
},
{
    key: SectionKey.Experience,
    label: 'Experience',
    description: 'Roles, education and CV link'
},
{
    key: SectionKey.Projects,
    label: 'Projects',
    description: 'Side projects grid'
},
{
    key: SectionKey.References,
    label: 'References',
    description: 'Client quotes'
},
{
    key: SectionKey.ClosingCta,
    label: 'Closing call to action',
    description: 'Closing prompt'
},
{
    key: SectionKey.ContactHero,
    label: 'Contact hero',
    description: 'Contact page opening'
},
{
    key: SectionKey.ContactEnquiry,
    label: 'Project enquiry',
    description: 'Project enquiry form'
},
{
    key: SectionKey.ContactFeedback,
    label: 'Feedback',
    description: 'Feedback form'
},
{
    key: SectionKey.Footer,
    label: 'Footer',
    description: 'Footer line'
}];
