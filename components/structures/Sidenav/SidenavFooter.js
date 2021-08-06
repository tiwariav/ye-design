import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./sidenavFooter.module.css";

export default function SidenavFooter({ children, hasSeparator, ...props }) {
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

SidenavFooter.propTypes = {
  hasSeparator: PropTypes.bool,
};
