import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Container } from "../../atoms/sections";
import styles from "./topnav.module.css";

const variantOptions = ["basic", "transparent", "flat", "underlined"];

export default function Topnav({
  banner,
  className,
  contentLeft,
  contentRight,
  expandedHeight = 112,
  isExpanded,
  logo,
  logoVariant,
  variant,
  withSidenav,
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.root,
        styles[`is-${variant}`],
        {
          [styles.isExpanded]: isExpanded,
          [styles.withSidenav]: withSidenav,
        },
        className
      )}
      {...props}
    >
      {banner ? (
        <div className={clsx(styles.container, styles.banner)}>{banner}</div>
      ) : null}
      <Container className={styles.container}>
        {logo ? (
          <div
            className={clsx(
              styles["logo-container"],
              styles[`is-logo-${logoVariant}`]
            )}
            style={isExpanded ? { height: expandedHeight } : undefined}
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
      </Container>
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
   * Design variant
   */
  variant: PropTypes.oneOf(variantOptions),
  /**
   * Wether to keep in sync with sidenav
   */
  withSidenav: PropTypes.bool,
};

Topnav.defaultProps = {
  logoVariant: "basic",
};
