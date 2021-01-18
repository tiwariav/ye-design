import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./sidenav.module.css";

export default function SidenavGroup({ title, children, ...props }) {
  return (
    <div className={clsx(styles.sidenavGroup)} {...props}>
      {title ? (
        <div className={clsx(styles.sidenavGroupTitle)}>{title}</div>
      ) : null}
      {children}
    </div>
  );
}

SidenavGroup.propTypes = {
  title: PropTypes.string,
};
