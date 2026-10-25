import type React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash: React.FunctionComponent = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({
                top: 0
            });

            return;
        }

        document.querySelector(hash)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [pathname, hash]);

    return false;
};

export default ScrollToHash;
