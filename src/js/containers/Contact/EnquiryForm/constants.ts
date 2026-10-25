export enum Key {
    Name = 'name',
    Email = 'email',
    Company = 'company',
    Kind = 'kind',
    Budget = 'budget',
    Timeline = 'timeline',
    Message = 'message'
}

export const KINDS = [
    'New product, greenfield',
    'Existing codebase — rescue or refactor',
    'Frontend architecture review',
    'Joining an existing team',
    'Something else'
] as const;

export const BUDGETS = [
    'Not sure yet',
    'Under €10k',
    '€10k — €25k',
    '€25k — €50k',
    '€50k and up',
    'Day rate, ongoing'
] as const;

export const TIMELINES = [
    'As soon as possible',
    'Within a month',
    'Next quarter',
    'Just exploring for now'
] as const;

const [DEFAULT_KIND] = KINDS;
const [DEFAULT_BUDGET] = BUDGETS;
const [DEFAULT_TIMELINE] = TIMELINES;

export const BLANK: Record<Key, string> = {
    name: '',
    email: '',
    company: '',
    kind: DEFAULT_KIND,
    budget: DEFAULT_BUDGET,
    timeline: DEFAULT_TIMELINE,
    message: ''
};
