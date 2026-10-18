import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type Variant = "primary" | "secondary" | "ghost" | "danger";

export interface Common {
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

export type AsLink = Common &
  { to: string } &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export type AsAnchor = Common &
  { href: string } &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

export type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
