import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./sideNavFooter.module.css";

export default function SideNavFooter({ children, hasSeparator, ...props }) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.hasSeparator]: hasSeparator,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

SideNavFooter.propTypes = {
  hasSeparator: PropTypes.bool,
};
