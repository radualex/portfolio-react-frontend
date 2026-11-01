import { useEffect } from 'react';

// Helpers
import { upsertMeta } from './helpers';

// Types
import type { UsePageMetaOptions } from './types';

const usePageMeta = ({ title, description, noindex }: UsePageMetaOptions) => {
    useEffect(() => {
        document.title = title;

        if (description) {
            upsertMeta('description', description);
        }

        upsertMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    }, [title, description, noindex]);
};

export default usePageMeta;
