import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./divider.module.css";

function Divider({ className, spacing, vertical, ...props }) {
  return React.createElement(
    vertical ? "div" : "hr",
    {
      className: clsx(
        styles.root,
        { "is-vertical": vertical },
        styles[`space-${spacing}`],
        className
      ),
      ...props,
    },
    null
  );
}

Divider.propTypes = {
  /**
   * How large should the padding be?
   */
  spacing: PropTypes.oneOf(["none", "small", "medium", "large"]),
};

Divider.defaultProps = {
  spacing: "medium",
};

export default Divider;
