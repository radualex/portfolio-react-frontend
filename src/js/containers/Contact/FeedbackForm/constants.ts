export enum Key {
    Name = 'name',
    Topic = 'topic',
    Message = 'message'
}

export const TOPICS = [
    'The work',
    'This website',
    'Something\'s broken',
    'Other'
] as const;

const [DEFAULT_TOPIC] = TOPICS;

export const BLANK: Record<Key, string> = {
    name: '',
    topic: DEFAULT_TOPIC,
    message: ''
};
