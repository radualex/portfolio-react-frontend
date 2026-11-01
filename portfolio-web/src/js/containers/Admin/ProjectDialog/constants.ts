export enum Key {
    Title = 'title',
    Kind = 'kind',
    Description = 'description',
    Stack = 'stack',
    LinkLabel = 'linkLabel',
    Link = 'link'
}

export const BLANK: Record<Key, string> = {
    title: '',
    kind: 'Open source',
    description: '',
    stack: '',
    linkLabel: 'View on GitHub',
    link: ''
};
