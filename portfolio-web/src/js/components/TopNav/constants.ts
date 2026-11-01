// Constants
import { SectionKey } from '@/store/constants';

// Types
import type { NavSection } from './types';

export const SECTIONS = [{
    to: '/#capabilities',
    label: 'Approach',
    key: SectionKey.Capabilities
},
{
    to: '/#experience',
    label: 'Experience',
    key: SectionKey.Experience
},
{
    to: '/#projects',
    label: 'Projects',
    key: SectionKey.Projects
},
{
    to: '/#references',
    label: 'References',
    key: SectionKey.References
}] as const satisfies readonly NavSection[];
