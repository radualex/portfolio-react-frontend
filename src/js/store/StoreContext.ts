import { createContext, useContext } from "react";
import type {
  Availability,
  Message,
  MessageDraft,
  PortfolioState,
  Project,
  ProjectDraft,
  ProjectUpdate,
} from "@/store/types";

export interface ProjectListOptions {
  includeHidden?: boolean;
}

export interface StoreValue {
  state: PortfolioState;
  projects: (options?: ProjectListOptions) => Project[];
  unreadCount: number;

  setAvailability: (next: Partial<Availability>) => void;

  saveProject: (draft: ProjectDraft | ProjectUpdate) => void;
  removeProject: (id: string) => void;
  moveProject: (id: string, delta: number) => void;

  addMessage: (draft: MessageDraft) => void;
  updateMessage: (id: string, patch: Partial<Message>) => void;
  removeMessage: (id: string) => void;

  resetAll: () => void;
}

export const StoreContext = createContext<StoreValue | null>(null);

export const useStore = (): StoreValue => {
  const value = useContext(StoreContext);

  if (!value) {
    throw new Error("useStore must be called inside <StoreProvider>.");
  }

  return value;
};
