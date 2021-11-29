import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./topNav.module.css";

export default function TopNavItem({ children, hasSeparator, ...props }) {
  return (
    <div
      className={clsx(styles.topNavItem, {
        [styles.hasSeparator]: hasSeparator,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

TopNavItem.propTypes = {
  hasSeparator: PropTypes.bool,
};
