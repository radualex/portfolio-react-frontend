export const ADMIN_SESSION_KEY = 'rs-admin-mode';
export const AUTO_EDIT_KEY = 'rs-admin-edit';

const isFlagSet = (key: string): boolean => {
    try {
        return globalThis.sessionStorage.getItem(key) === '1';
    } catch {
        return false;
    }
};

const writeFlag = (key: string, isOn: boolean): void => {
    try {
        if (isOn) {
            globalThis.sessionStorage.setItem(key, '1');

            return;
        }

        globalThis.sessionStorage.removeItem(key);
    } catch {
        return;
    }
};

export const readAdminFlag = (): boolean => { // eslint-disable-line unicorn/consistent-boolean-name -- exported name is part of this module's existing API
    return isFlagSet(ADMIN_SESSION_KEY);
};

export const writeAdminFlag = (isOn: boolean): void => {
    writeFlag(ADMIN_SESSION_KEY, isOn);
};

export const readAutoEditFlag = (): boolean => { // eslint-disable-line unicorn/consistent-boolean-name -- exported name is part of this module's existing API
    return isFlagSet(AUTO_EDIT_KEY);
};

export const writeAutoEditFlag = (isOn: boolean): void => {
    writeFlag(AUTO_EDIT_KEY, isOn);
};
