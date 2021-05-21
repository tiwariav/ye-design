import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Spinner from "../../content/Spinner/Spinner";
import formStyles from "../form.module.css";
import styles from "./textInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function TextInput({
  size,
  iconBefore,
  iconAfter,
  label,
  variant,
  onFocus,
  onBlur,
  isBusy,
  spacing,
  className,
  inputClassName,
  register,
  ...props
}) {
  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus = (e) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  const handleBlur = (e) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div
      className={clsx(
        formStyles[`is-${size}`],
        styles.wrapper,
        styles[`is-${variant}`],
        {
          [styles.hasFocus]: hasFocus,
        },
        className
      )}
    >
      {iconBefore ? (
        <span className={clsx(styles.iconWrapper)}>
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconBefore}
          </span>
        </span>
      ) : null}
      <input
        type="text"
        className={clsx(
          formStyles.control,
          formStyles[`is-${variant}`],
          {
            [styles.paddedLeft]: iconBefore,
            [styles.paddedRight]: iconAfter,
            [styles[`space-${spacing}`]]: spacing,
          },
          styles.textInput,
          inputClassName
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={register}
        {...props}
      />
      {iconAfter ? (
        <span className={clsx(styles.iconWrapper, styles.iconRight)}>
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconAfter}
          </span>
        </span>
      ) : null}
      {isBusy ? <Spinner className={styles.spinner} /> : null}
    </div>
  );
}

TextInput.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Icon element
   */
  iconBefore: PropTypes.element,
  /**
   * Icon element
   */
  iconAfter: PropTypes.element,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Label text
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};

TextInput.defaultProps = {
  size: "medium",
};
