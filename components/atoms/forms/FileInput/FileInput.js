import clsx from "clsx";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import Spinner from "../../content/Spinner/Spinner";
import formStyles from "../form.module.css";
import styles from "./fileInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function FileInput({
  size = "medium",
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
  placeholder = "Browse",
  ...props
}) {
  const [hasFocus, setHasFocus] = useState(false);
  const idRef = useRef(uniqueId("input_"));

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
    <label
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
      {label ? <span className={styles.label}>{label}</span> : null}
      {iconBefore ? (
        <span className={clsx(styles.iconWrapper)}>
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconBefore}
          </span>
        </span>
      ) : null}
      <input
        id={idRef}
        type="file"
        className={clsx(styles.input)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <span className={clsx(styles.placeholder, inputClassName)}>
        {placeholder}
      </span>
      {iconAfter ? (
        <span className={clsx(styles.iconWrapper, styles.iconRight)}>
          <span className={clsx(formStyles.icon, styles.icon)}>
            {iconAfter}
          </span>
        </span>
      ) : null}
      {isBusy ? <Spinner className={styles.spinner} /> : null}
    </label>
  );
}

FileInput.propTypes = {
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
