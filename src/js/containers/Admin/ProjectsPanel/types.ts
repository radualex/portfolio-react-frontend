import type { Project } from "@/store/types";

export interface EditingState {
  project: Project | null;
}

/* null = closed; a state is open on a project. */
export type Editing = EditingState | null;
