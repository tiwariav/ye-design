import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./container.module.css";

function Container({ spacing, children, className, ...props }) {
  return (
    <div
      className={clsx(styles.container, styles[`space-${spacing}`], className)}
      {...props}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  /**
   * How large should the padding be?
   */
  spacing: PropTypes.oneOf(["none", "small", "medium", "large"]),
};

Container.defaultProps = {
  spacing: "medium",
};

export default Container;
