/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-outlined', 'is-dashed', 'is-trans', 'is-inline', 'is-neu',
  'is-list-item', 'is-primary', 'is-filled',
  'is-small', 'is-large',
  'effect-cursor-tracking', 'effect-ripple',
  'spacing-equal', 'spacing-extra', 'spacing-less', 'spacing-none'
]}] */

import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { useMouseHovered } from "react-use";
import { usePropRef } from "../../../../hooks";
import { overrideStyleProperty } from "../../../../lib/css";
import Spinner from "../../content/Spinner/Spinner";
// eslint-disable-next-line css-modules/no-unused-class
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
  "neu",
];
const cursorOptions = ["pointer", "not-allowed"];
const effectOptions = ["cursor-tracking", "ripple"];

const setRippleProperties = (node, initial, x = 0, y = 0) => {
  node.style.setProperty("--ye-effect-ripple-x", x + "px");
  node.style.setProperty("--ye-effect-ripple-y", y + "px");
  if (initial) {
    node.style.setProperty(
      "--ye-effect-ripple-diameter",
      Math.max(node.clientWidth, node.clientHeight) * 2 + "px"
    );
  }
};

const setTrackingProperties = (node, x = 0, y = 0) => {
  node.style.setProperty("--ye-effect-tracking-x", x + "px");
  node.style.setProperty("--ye-effect-tracking-y", y + "px");
};

const setNeuProperties = (node, options = {}) => {
  overrideStyleProperty(
    "--ye-color-neu-background-dark",
    options.colors?.backgroundDark,
    node
  );
  overrideStyleProperty(
    "--ye-color-neu-background-light",
    options.colors?.backgroundLight,
    node
  );
  overrideStyleProperty(
    "--ye-color-neu-shadow-dark",
    options.colors?.shadowDark,
    node
  );
  overrideStyleProperty(
    "--ye-color-neu-shadow-light",
    options.colors?.shadowLight,
    node
  );
};

/**
 * Primary UI component for user interaction
 */
const Button = forwardRef(
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
      disabled,
      spacing,
      onClick,
      isBusy,
      isFullWidth,
      neuOptions,
      ...props
    },
    propRef
  ) => {
    const { innerRef, setInnerRef } = usePropRef(propRef);

    const mouseData = useMouseHovered(innerRef, {
      bound: true,
      whenHovered: true,
    });

    useEffect(() => {
      if (
        innerRef.current &&
        effects.length > 0 &&
        effects.includes("ripple")
      ) {
        setRippleProperties(innerRef.current, true);
      }
    }, [effects, innerRef]);

    useEffect(() => {
      if (innerRef.current) {
        if (effects.length > 0) {
          if (effects.includes("cursor-tracking")) {
            setTrackingProperties(
              innerRef.current,
              mouseData.elX,
              mouseData.elY
            );
          }
          if (effects.includes("ripple")) {
            setRippleProperties(innerRef.current, true);
          }
        }
        if (variant === "neu") {
          setNeuProperties(innerRef.current, neuOptions);
        }
      }
    }, [effects, mouseData, variant, neuOptions, innerRef]);

    const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

    return (
      <button
        ref={setInnerRef}
        type="button"
        className={clsx(
          formStyles.control,
          formStyles[`is-${variant}`],
          styles.root,
          styles[`is-${size}`],
          styles[`is-${variant}`],
          {
            [styles[`spacing-${spacing}`]]: spacing,
            // eslint-disable-next-line css-modules/no-undef-class
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
              innerRef.current,
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
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconBefore}
          </span>
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
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconAfter}
          </span>
        ) : null}
        {isBusy ? <Spinner className={styles.spinner} /> : null}
      </button>
    );
  }
);

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
   * Cursor on hover of button
   */
  cursorOptions: PropTypes.oneOf(cursorOptions),
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

export default Button;
