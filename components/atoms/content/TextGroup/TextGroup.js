import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./textGroup.module.css";
import TextGroupLoader from "./TextGroupLoader";

function TextGroup({
  children,
  iconBefore,
  iconAfter,
  loading,
  busy,
  style,
  className,
  ...props
}) {
  return (
    <span className={clsx(styles.container, className)} {...props}>
      {loading ? (
        <TextGroupLoader
          iconAfter={Boolean(iconAfter)}
          iconBefore={Boolean(iconBefore)}
        />
      ) : (
        <>
          {iconBefore ? (
            <span className={clsx(styles.icon)}>{iconBefore}</span>
          ) : null}
          {children}
          {iconAfter ? (
            <span className={clsx(styles.icon, styles.isAfter)}>
              {iconAfter}
            </span>
          ) : null}
        </>
      )}
      {busy ? <Spinner className={styles.spinner} /> : null}
    </span>
  );
}

TextGroup.propTypes = {
  loading: PropTypes.bool,
  /**
   * Wether the element is busy
   */
  busy: PropTypes.bool,
};

export default TextGroup;
