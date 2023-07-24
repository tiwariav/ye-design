/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  variant-secondary,
  align-center,
  width-xsmall, width-small,
  height-readable, height-full,
  spacing-none, spacing-small, spacing-large, spacing-horizontal
]}] */

import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";

import styles from "./container.module.css";

export const CONTAINER_SPACINGS = [
  "none",
  "small",
  "large",
  "horizontal",
] as const;
export const CONTAINER_HEIGHTS = ["readable", "full"] as const;
export const CONTAINER_WIDTHS = ["small", "xsmall"] as const;

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  align?: "center";
  height?: (typeof CONTAINER_HEIGHTS)[number];
  spacing?: (typeof CONTAINER_SPACINGS)[number];
  variant?: "secondary";
  width?: (typeof CONTAINER_WIDTHS)[number];
}

export default function Container({
  align,
  children,
  className,
  height,
  spacing,
  variant,
  width,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        styles.container,
        spacing && styles[`spacing-${spacing}`],
        variant && styles[`variant-${variant}`],
        height && [styles[`height-${height}`]],
        align && [styles[`align-${align}`]],
        width && [styles[`width-${width}`]],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
