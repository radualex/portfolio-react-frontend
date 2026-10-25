// Types
import type { Project } from '@/store/types';

export interface EditingState {
    project: Project | null;
}

export type Editing = EditingState | undefined;
