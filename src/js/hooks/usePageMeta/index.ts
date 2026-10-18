import { useEffect } from "react";
import type { UsePageMetaOptions } from "./types";

const upsertMeta = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
};

const usePageMeta = ({ title, description, noindex }: UsePageMetaOptions) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsertMeta("description", description);
    }

    upsertMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, noindex]);
};

export default usePageMeta;
