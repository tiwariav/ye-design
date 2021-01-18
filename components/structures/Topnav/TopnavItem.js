import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./topnav.module.css";

export default function TopnavItem({ children, hasSeparator, ...props }) {
  return (
    <div
      className={clsx(styles.topnavItem, {
        [styles.hasSeparator]: hasSeparator,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

TopnavItem.propTypes = {
  hasSeparator: PropTypes.bool,
};
