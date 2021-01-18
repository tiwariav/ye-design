import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./topnav.module.css";

export default function Topnav({
  logo,
  logoVariant,
  contentLeft,
  contentRight,
  isTransparent,
  isExpanded,
  isShrinking,
  withSidenav,
  ...props
}) {
  return (
    <div
      className={clsx(styles.topnav, {
        [styles.isTransparent]: isTransparent,
        [styles.isExpanded]: isExpanded,
        [styles.withSidenav]: withSidenav,
      })}
      {...props}
    >
      {logo ? (
        <div
          className={clsx(
            styles["logo-container"],
            styles[`is-logo-${logoVariant}`]
          )}
          style={
            isExpanded && isShrinking
              ? { height: `calc(112px - ${isShrinking}px)` }
              : undefined
          }
        >
          <div className={styles.logo}>{logo}</div>
        </div>
      ) : null}
      {contentLeft ? (
        <div className={styles.contentLeft}>{contentLeft}</div>
      ) : null}
      {contentRight ? (
        <div className={styles.contentRight}>{contentRight}</div>
      ) : null}
    </div>
  );
}

Topnav.propTypes = {
  /**
   * Logo rendered on left of Topnav
   */
  logo: PropTypes.element,
  /**
   * Logo variant
   */
  logoVariant: PropTypes.oneOf(["basic", "hanging"]),
  /**
   * Content to be rendered on left half
   */
  contentLeft: PropTypes.element,
  /**
   * Content to be rendered on right half
   */
  contentRight: PropTypes.element,
  /**
   * Wether the topnav is transparent
   */
  isTransparent: PropTypes.bool,
  /**
   * Wether to keep in sync with sidenav
   */
  withSidenav: PropTypes.bool,
};

Topnav.defaultProps = {
  logoVariant: "basic",
};
