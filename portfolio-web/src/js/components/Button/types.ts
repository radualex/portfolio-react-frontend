import type { ComponentPropsWithoutRef } from 'react';

// Constants
import type { ButtonSize, ButtonVariant } from './constants';

export interface BaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    arrow?: boolean;
    block?: boolean;
    className?: string;
}

export interface LinkProps extends BaseProps, Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
    to: string;
    href?: never;
}

export interface AnchorProps extends BaseProps, ComponentPropsWithoutRef<'a'> {
    href: string;
    to?: never;
}

export interface ButtonProps extends BaseProps, ComponentPropsWithoutRef<'button'> {
    to?: never;
    href?: never;
}
