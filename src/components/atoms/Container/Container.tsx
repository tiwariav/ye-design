/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-secondary', 'align-center', 'width-xsmall', 'width-small', 'height-readable', 'height-full',
  'space-none', 'space-small', 'space-large', 'space-horizontal'
]}] */

import { clsx } from "clsx";
import styles from "./container.module.css";

const spacingOptions = ["none", "small", "medium", "large", "horizontal"];

export default function Container({
  spacing = "medium",
  children,
  align,
  className,
  variant = "basic",
  width,
  height,
  ...props
}: any) {
  return (
    <div
      className={clsx(
        styles.container,
        styles[`space-${spacing}`],
        styles[`is-${variant}`],
        {
          [styles[`align-${align}`]]: align,
          [styles[`width-${width}`]]: width,
          [styles[`height-${height}`]]: height,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
