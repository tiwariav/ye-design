import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import styles from "./anchor.module.css";

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
    },
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

Anchor.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Icon element that appears before label
   */
  iconBefore: PropTypes.element,
  /**
   * Icon element that appears after label
   */
  iconAfter: PropTypes.element,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Design variant
   */
  variant: PropTypes.oneOf([
    "basic",
    "list-item",
    "outlined",
    "filled",
    "nav-item",
    "color",
  ]),
  /**
   * Effects
   */
  effects: PropTypes.arrayOf(PropTypes.oneOf([])),
};

export default Anchor;
