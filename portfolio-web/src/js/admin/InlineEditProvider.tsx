import React, { useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import InlineEditBar from './InlineEditBar';
import { useToast } from '@/components/Toast/ToastContext';
import { useAdminMode } from './AdminModeContext';
import { InlineEditContext, type EditScope, type InlineEditValue } from './InlineEditContext';
import { setByPath } from './paths';
import { readAutoEditFlag, writeAutoEditFlag } from './storage';

// Store
import { useStore } from '@/store/StoreContext';
import type { SiteContent } from '@/store/types';

export interface Props {
    children: ReactNode;
}

type EditingSectionAction = { type: 'clear'; } | { type: 'clearUnlessSite'; } | { type: 'scope'; scope: EditScope; };

const editingSectionReducer = (current: EditScope | undefined, action: EditingSectionAction): EditScope | undefined => {
    switch (action.type) {
        case 'clear': {
            return;
        }

        case 'clearUnlessSite': {
            return current === 'site' ? current : undefined;
        }

        case 'scope': {
            return action.scope;
        }
        default: {
            return current;
        }
    }
};

const draftReducer = (_current: SiteContent, next: SiteContent): SiteContent => {
    return next;
};

const InlineEditProvider: React.FunctionComponent<Props> = ({ children }) => {
    const { state, setContent } = useStore();
    const { isAdmin } = useAdminMode();
    const toast = useToast();
    const location = useLocation();
    const [editingSection, dispatchEditingSection] = useReducer(
        editingSectionReducer,
        undefined
    );
    const [draft, dispatchDraft] = useReducer(draftReducer, state.content);
    const draftRef = useRef<SiteContent>(state.content);

    useEffect(() => {
        if (!isAdmin) {
            dispatchEditingSection({
                type: 'clear'
            });
        }
    }, [isAdmin]);

    useEffect(() => {
        dispatchEditingSection({
            type: 'clearUnlessSite'
        });
    }, [location.pathname]);

    const start = useCallback((scope: EditScope) => {
        if (!isAdmin) {
            return;
        }

        const next = structuredClone(state.content);

        draftRef.current = next;
        dispatchDraft(next);
        dispatchEditingSection({
            type: 'scope',
            scope
        });
    }, [isAdmin, state.content]);

    useEffect(() => {
        if (!isAdmin || !readAutoEditFlag()) {
            return;
        }

        writeAutoEditFlag(false);
        start('site');
    }, [isAdmin, location.pathname, start]);

    const update = useCallback((path: string, value: string) => {
        const next = setByPath(draftRef.current, path, value) as SiteContent;

        draftRef.current = next;
        dispatchDraft(next);
    }, []);

    const save = useCallback(() => {
        if (!editingSection) {
            return;
        }

        setContent(draftRef.current);
        toast('Section saved');
        dispatchEditingSection({
            type: 'clear'
        });
    }, [editingSection, setContent, toast]);

    const cancel = useCallback(() => {
        dispatchEditingSection({
            type: 'clear'
        });
    }, []);

    const content = editingSection ? draft : state.content;

    const value = useMemo<InlineEditValue>(() => {
        return {
            content,
            editingSection,
            start,
            update,
            save,
            cancel
        };
    }, [content, editingSection, start, update, save, cancel]);

    return (
        <InlineEditContext value={value}>
            {children}
            {editingSection && <InlineEditBar />}
        </InlineEditContext>
    );
};

export default InlineEditProvider;
