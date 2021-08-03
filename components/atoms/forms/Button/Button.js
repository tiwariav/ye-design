import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useMouseHovered } from "react-use";
import Spinner from "../../content/Spinner/Spinner";
import formStyles from "../form.module.css";
import styles from "./button.module.css";

const variantOptions = [
  "basic",
  "dark",
  "dashed",
  "filled",
  "inline",
  "list-item",
  "outlined",
  "primary",
  "trans",
];
const effectOptions = ["cursor-tracking", "ripple"];

const setRippleProperties = (node, initial, x = "50%", y = "50%") => {
  node.style.setProperty("--effect-ripple-x", x + "px");
  node.style.setProperty("--effect-ripple-y", y + "px");
  if (initial) {
    node.style.setProperty(
      "--effect-ripple-diameter",
      Math.max(node.clientWidth, node.clientHeight) * 2 + "px"
    );
  }
};

const setTrackingProperties = (node, x = "50%", y = "50%") => {
  node.style.setProperty("--effect-tracking-x", x + "px");
  node.style.setProperty("--effect-tracking-y", y + "px");
};

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
  disabled,
  spacing,
  onClick,
  isBusy,
  isFullWidth,
  ...props
}) {
  const ref = React.useRef(null);
  const mouseData = useMouseHovered(ref, { bound: true, whenHovered: true });

  useEffect(() => {
    if (ref.current && effects.length && effects.includes("ripple")) {
      setRippleProperties(ref.current, true);
    }
  }, [effects]);

  useEffect(() => {
    if (ref.current && effects.length) {
      if (effects.includes("cursor-tracking")) {
        setTrackingProperties(ref.current, mouseData.elX, mouseData.elY);
      }
      if (effects.includes("ripple")) {
        setRippleProperties(ref.current, true);
      }
    }
  }, [effects, mouseData]);

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
        {
          [styles[`spacing-${spacing}`]]: spacing,
          [styles.hasFocus]: isBusy,
          [styles.isFullWidth]: isFullWidth,
          [styles.disabled]: disabled,
        },
        ...effectClasses,
        className
      )}
      onClick={(event) => {
        if (effects.includes("ripple")) {
          setRippleProperties(
            ref.current,
            false,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          );
        }
        if (onClick) {
          onClick(event);
        }
      }}
      disabled={disabled || isBusy}
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
      {isBusy ? <Spinner className={styles.spinner} /> : null}
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
  spacing: PropTypes.oneOf(["equal", "extra", "less", "none"]),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};
Button.defaultProps = {
  variant: "basic",
  effects: [],
  size: "medium",
  onClick: undefined,
};
