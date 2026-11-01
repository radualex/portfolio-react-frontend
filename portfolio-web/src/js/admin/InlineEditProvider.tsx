import React, { useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Constants
import { EditingSectionActionType } from './constants';

// Components
import ContentConflictDialog from './ContentConflictDialog';
import InlineEditBar from './InlineEditBar';
import { useToast } from '@/components/Toast/ToastContext';
import { useAdminMode } from './AdminModeContext';
import { InlineEditContext } from './InlineEditContext';
import { setByPath } from './paths';
import { readAutoEditFlag, writeAutoEditFlag } from './storage';

// Store
import { useStore } from '@/store/StoreContext';

// Types
import type { SiteContent } from '@/store/types';
import type { EditingSectionAction, EditScope, InlineEditValue } from './types';

export interface Props {
    children: ReactNode;
}

const editingSectionReducer = (current: EditScope | undefined, action: EditingSectionAction): EditScope | undefined => {
    switch (action.type) {
        case EditingSectionActionType.Clear: {
            return;
        }

        case EditingSectionActionType.ClearUnlessSite: {
            return current === 'site' ? current : undefined;
        }

        case EditingSectionActionType.Scope: {
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
    const { state, setContent, canEdit } = useStore();
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
                type: EditingSectionActionType.Clear
            });
        }
    }, [isAdmin]);

    useEffect(() => {
        dispatchEditingSection({
            type: EditingSectionActionType.ClearUnlessSite
        });
    }, [location.pathname]);

    const start = useCallback((scope: EditScope) => {
        if (!isAdmin) {
            return;
        }

        if (!canEdit) {
            toast('Editing needs a live connection to the content service');

            return;
        }

        const next = structuredClone(state.content);

        draftRef.current = next;
        dispatchDraft(next);
        dispatchEditingSection({
            type: EditingSectionActionType.Scope,
            scope
        });
    }, [canEdit, isAdmin, state.content, toast]);

    useEffect(() => {
        if (!isAdmin || !canEdit || !readAutoEditFlag()) {
            return;
        }

        writeAutoEditFlag(false);
        start('site');
    }, [canEdit, isAdmin, location.pathname, start]);

    const update = useCallback((path: string, value: string) => {
        const next = setByPath(draftRef.current, path, value) as SiteContent;

        draftRef.current = next;
        dispatchDraft(next);
    }, []);

    const save = useCallback(async () => {
        if (!editingSection) {
            return;
        }

        const outcome = await setContent(draftRef.current);

        if (outcome === 'saved') {
            toast('Section saved');
            dispatchEditingSection({
                type: EditingSectionActionType.Clear
            });

            return;
        }

        if (outcome === 'error') {
            toast('Could not save — the content service is unreachable');
        }
    }, [editingSection, setContent, toast]);

    const handleSave = useCallback(() => {
        void save();
    }, [save]);

    const cancel = useCallback(() => {
        dispatchEditingSection({
            type: EditingSectionActionType.Clear
        });
    }, []);

    const content = editingSection ? draft : state.content;

    const value = useMemo<InlineEditValue>(() => {
        return {
            content,
            editingSection,
            start,
            update,
            save: handleSave,
            cancel
        };
    }, [content, editingSection, handleSave, start, update, cancel]);

    return (
        <InlineEditContext value={value}>
            {children}
            {editingSection && <InlineEditBar />}
            <ContentConflictDialog />
        </InlineEditContext>
    );
};

export default InlineEditProvider;
