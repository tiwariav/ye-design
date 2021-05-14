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
      size,
      iconBefore,
      iconAfter,
      label,
      variant,
      effects,
      children,
      className,
      busy,
      ...props
    },
    ref
  ) => {
    const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

    return (
      <a
        ref={ref}
        className={clsx(
          styles.anchor,
          styles[`is-${size}`],
          styles[`is-${variant}`],
          ...effectClasses,
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
      </a>
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

Anchor.defaultProps = {
  variant: "basic",
  effects: [],
  size: "medium",
};

export default Anchor;
