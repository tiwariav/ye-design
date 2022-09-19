import { clsx } from "clsx";
import { forwardRef, ReactNode } from "react";
import styles from "./anchor.module.css";

const sizes = ["small", "medium", "large"] as const;
const variants = [
  "basic",
  "list-item",
  "outlined",
  "filled",
  "nav-item",
  "color",
] as const;

type AnchorProps = {
  as: any;
  size: typeof sizes[number];
  iconAfter: ReactNode;
  iconBefore: ReactNode;
  label: string;
  variant: typeof variants[number];
  effects: any;

  children: any;
  className: any;
  spacing: any;
  noVisited: any;
};

/**
 * Primary UI component for user interaction
 */
const Anchor = forwardRef(
  (
    {
      as,
      size = "medium",
      iconBefore,
      iconAfter,
      label,
      variant = "basic",
      effects = [],
      children,
      className,
      spacing,
      noVisited,
      ...props
    }: AnchorProps,
    ref
  ) => {
    const As = as || "a";
    const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

    return (
      <As
        ref={ref}
        className={clsx(
          styles.anchor,
          ...effectClasses,
          {
            [styles[`is-${size}`]]: size,
            [styles[`is-${variant}`]]: variant,
            [styles[`spacing-${spacing}`]]: spacing,
            [styles.noVisited]: noVisited,
          },
          className
        )}
        {...props}
      >
        {iconBefore ? (
          <span className={clsx(styles.icon)}>{iconBefore}</span>
        ) : null}
        {label}
        {children}
        {iconAfter ? (
          <span className={clsx(styles.icon, styles.isAfter)}>{iconAfter}</span>
        ) : null}
      </As>
    );
  }
);

export default Anchor;
