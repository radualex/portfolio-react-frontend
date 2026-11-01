export const upsertMeta = (name: string, content: string) => {
    let tag = document.querySelector<HTMLMetaElement>(`meta[name="${CSS.escape(name)}"]`);

    if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.append(tag);
    }

    tag.content = content;
};
