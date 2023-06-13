/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-secondary', 'align-center', 'width-xsmall', 'width-small', 'height-readable', 'height-full',
  'space-none', 'space-small', 'space-large', 'space-horizontal'
]}] */

import { clsx } from "clsx";

import styles from "./container.module.css";

const spacingOptions = ["none", "small", "medium", "large", "horizontal"];

interface ContainerProps {
  align?: "center" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  height?: "full" | "readable";
  spacing?: (typeof spacingOptions)[number];
  variant?: "basic" | "secondary";
  width?: "large" | "medium" | "small" | "xlarge" | "xsmall";
}

export default function Container({
  align,
  children,
  className,
  height,
  spacing = "medium",
  variant = "basic",
  width,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        styles.container,
        styles[`space-${spacing}`],
        styles[`is-${variant}`],
        {
          [styles[`align-${align}`]]: align,
          [styles[`height-${height}`]]: height,
          [styles[`width-${width}`]]: width,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
