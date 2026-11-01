export type Validator = (value: string) => string | undefined;

export interface Change {
    path: string;
    mine: string;
    theirs: string;
}
