import { useEffect, useMemo, useState } from "react";
import type React from "react";
import type { ReactNode } from "react";
import { StoreContext } from "@/store/StoreContext";
import type { StoreValue } from "@/store/StoreContext";
import {
  STORAGE_KEY,
  readState,
  seededState,
  uid,
  writeState,
} from "@/store/storage";
import type { Message, PortfolioState, Project } from "@/store/types";

export interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<PortfolioState>(readState);

  /* Another tab writing the same key is the only sync left; React re-renders itself. */
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setState(readState());
    };

    window.addEventListener("storage", sync);

    return () => window.removeEventListener("storage", sync);
  }, []);

  const value = useMemo<StoreValue>(() => {
    /* Single writer, so persistence can never drift from what is rendered. */
    const commit = (next: PortfolioState) => {
      setState(next);
      writeState(next);
    };

    return {
      state,

      projects: (options) =>
        options?.includeHidden
          ? state.projects
          : state.projects.filter((project) => !project.hidden),

      unreadCount: state.inbox.filter(
        (message) => !message.read && !message.archived,
      ).length,

      setAvailability: (next) => {
        commit({
          ...state,
          availability: {
            state: next.state ?? state.availability.state,
            note:
              typeof next.note === "string"
                ? next.note.slice(0, 160)
                : state.availability.note,
          },
        });
      },

      /* One entry point for add and edit: a draft with a known id patches, anything else is created. */
      saveProject: ({ id, ...fields }) => {
        const index = state.projects.findIndex((project) => project.id === id);

        if (index === -1) {
          /* id and hidden come last so a draft's `id: undefined` cannot overwrite the generated id. */
          const created: Project = {
            title: "",
            kind: "",
            description: "",
            stack: "",
            link: "",
            linkLabel: "",
            ...fields,
            id: uid("p"),
            hidden: false,
          };

          commit({
            ...state,
            projects: [...state.projects, created],
          });

          return;
        }

        const projects = state.projects.slice();

        projects[index] = {
          ...projects[index],
          ...fields,
        };

        commit({
          ...state,
          projects,
        });
      },

      removeProject: (id) => {
        commit({
          ...state,
          projects: state.projects.filter((project) => project.id !== id),
        });
      },

      moveProject: (id, delta) => {
        const from = state.projects.findIndex((project) => project.id === id);
        const to = from + delta;

        if (from === -1 || to < 0 || to >= state.projects.length) {
          return;
        }

        const projects = state.projects.slice();
        const [moved] = projects.splice(from, 1);

        projects.splice(to, 0, moved);

        commit({
          ...state,
          projects,
        });
      },

      addMessage: (draft) => {
        const message: Message = {
          id: uid("m"),
          at: new Date().toISOString(),
          read: false,
          archived: false,
          ...draft,
        };

        commit({
          ...state,
          inbox: [message, ...state.inbox],
        });
      },

      updateMessage: (id, patch) => {
        const index = state.inbox.findIndex((message) => message.id === id);

        if (index === -1) {
          return;
        }

        const inbox = state.inbox.slice();

        inbox[index] = {
          ...inbox[index],
          ...patch,
        };

        commit({
          ...state,
          inbox,
        });
      },

      removeMessage: (id) => {
        commit({
          ...state,
          inbox: state.inbox.filter((message) => message.id !== id),
        });
      },

      /* Through commit, so the seed is written back rather than only restored in memory. */
      resetAll: () => commit(seededState()),
    };
  }, [state]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
