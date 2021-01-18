import PropTypes from "prop-types";
import React from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./text.module.css";
import TextLoader from "./TextLoader";

function Text({
  children,
  loading,
  busy,
  minLines,
  maxLines,
  style,
  ...props
}) {
  const textStyles = {};
  if (maxLines) {
    textStyles.maxHeight = `${maxLines * 1.5}em`;
    textStyles.WebkitLineClamp = maxLines;
  }
  if (minLines) {
    textStyles.minHeight = `${minLines * 1.5}em`;
  }
  return (
    <span
      className={styles.text}
      style={{ ...textStyles, ...style }}
      {...props}
    >
      {loading ? (
        <TextLoader
          lines={minLines}
          className={styles.loader}
          style={{ height: textStyles.minHeight }}
        />
      ) : (
        children
      )}
      {busy ? <Spinner className={styles.spinner} /> : null}
    </span>
  );
}

Text.propTypes = {
  loading: PropTypes.bool,
  /**
   * Wether the element is busy
   */
  busy: PropTypes.bool,
};

export default Text;
