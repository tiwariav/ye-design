/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-small, is-large,
  is-list-item, is-nav-item,
  is-outlined, is-filled, is-basic, is-color
]}] */

import { clsx } from "clsx";
import {
  AnchorHTMLAttributes,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";

import styles from "./anchor.module.css";

const sizes = ["small", "medium", "large"];
const variants = [
  "basic",
  "list-item",
  "outlined",
  "filled",
  "nav-item",
  "color",
];
const effects = ["ripple", "cursor-tracking"];
const spacing = ["none", "less", "equal", "extra"];

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  Element?: ElementType;
  effects?: (typeof effects)[number][];
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  label?: string;
  noVisited?: boolean;
  size?: (typeof sizes)[number];
  spacing?: (typeof spacing)[number];
  variant?: (typeof variants)[number];
}

/**
 * Primary UI component for user interaction
 */
const Anchor = forwardRef(
  (
    {
      Element,
      children,
      className,
      effects = [],
      iconAfter,
      iconBefore,
      label,
      noVisited,
      size = "medium",
      spacing,
      variant = "basic",
      ...props
    }: AnchorProps,
    ref,
  ) => {
    const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

    return (
      <Element
        className={clsx(
          styles.anchor,
          ...effectClasses,
          {
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.noVisited]: noVisited,
            [styles[`is-${size}`]]: size,
            [styles[`is-${variant}`]]: variant,
            [styles[`spacing-${spacing}`]]: spacing,
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {iconBefore && <span className={clsx(styles.icon)}>{iconBefore}</span>}
        {label}
        {children}
        {iconAfter && (
          <span className={clsx(styles.icon, styles.isAfter)}>{iconAfter}</span>
        )}
      </Element>
    );
  },
);

export default Anchor;
