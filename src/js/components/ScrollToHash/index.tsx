import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Router navigation only changes the location object, so the scroll is done by hand after paint.
const ScrollToHash: React.FunctionComponent = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
      });

      return;
    }

    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
