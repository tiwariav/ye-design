import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useMouseHovered } from "react-use";
import Spinner from "../../content/Spinner/Spinner";
import formStyles from "../form.module.css";
import styles from "./button.module.css";

const variantOptions = [
  "basic",
  "primary",
  "outlined",
  "dashed",
  "trans",
  "list-item",
];
const effectOptions = ["cursor-tracking", "ripple"];

/**
 * Primary UI component for user interaction
 */
export default function Button({
  size,
  iconBefore,
  iconAfter,
  label,
  variant,
  effects,
  children,
  className,
  spacing,
  busy,
  ...props
}) {
  const ref = React.useRef(null);
  const mouseData = useMouseHovered(ref, { bound: true, whenHovered: true });

  useEffect(() => {
    if (ref && ref.current && effects.length) {
      ref.current.style.setProperty("--x", mouseData.elX + "px");
      ref.current.style.setProperty("--y", mouseData.elY + "px");
      if (effects.includes("ripple")) {
        ref.current.style.setProperty(
          "--ripple-diameter",
          Math.max(ref.current.clientWidth, ref.current.clientHeight) * 2 + "px"
        );
      }
    }
  }, [mouseData, effects]);

  const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        formStyles.control,
        formStyles[`is-${size}`],
        formStyles[`is-${variant}`],
        styles.button,
        styles[`is-${variant}`],
        { [styles[`spacing-${spacing}`]]: spacing },
        ...effectClasses,
        className
      )}
      {...props}
    >
      {iconBefore ? (
        <span className={clsx(formStyles.icon)}>{iconBefore}</span>
      ) : null}
      {(iconBefore || iconAfter) && (label || children) ? (
        <span>
          {label}
          {children}
        </span>
      ) : (
        <>
          {label}
          {children}
        </>
      )}
      {iconAfter ? (
        <span className={clsx(formStyles.icon, formStyles.isAfter)}>
          {iconAfter}
        </span>
      ) : null}
      {busy ? <Spinner className={styles.spinner} /> : null}
    </button>
  );
}

Button.propTypes = {
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
  variant: PropTypes.oneOf(variantOptions),
  /**
   * Effects
   */
  effects: PropTypes.arrayOf(PropTypes.oneOf(effectOptions)),
  /**
   * Spacing
   */
  spacing: PropTypes.oneOf(["equal"]),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Wether the element is busy
   */
  busy: PropTypes.bool,
};
Button.defaultProps = {
  variant: "basic",
  effects: [],
  size: "medium",
  onClick: undefined,
};
