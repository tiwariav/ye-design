import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./container.module.css";

function Container({
  spacing,
  children,
  align,
  className,
  variant = "basic",
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.container,
        styles[`space-${spacing}`],
        styles[`is-${variant}`],
        { [styles[`align-${align}`]]: align },
        className
      )}
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
  spacing: PropTypes.oneOf(["none", "small", "medium", "large", "horizontal"]),
};

Container.defaultProps = {
  spacing: "medium",
};

export default Container;
