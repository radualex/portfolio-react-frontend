// Constants
import type { SectionKey } from '@/store/constants';

export interface NavSection {
    to: string;
    label: string;
    key: SectionKey;
}
