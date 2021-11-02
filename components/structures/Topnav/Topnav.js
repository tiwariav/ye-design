import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useLockBodyScroll, useToggle, useWindowSize } from "react-use";
import { Button } from "../../atoms/forms";
import { Container, Divider } from "../../atoms/sections";
import styles from "./topnav.module.css";

const variantOptions = ["basic", "transparent", "flat", "underlined"];

export default function Topnav({
  banner,
  className,
  contentLeft,
  contentMenu,
  contentRight,
  expandedHeight = 72,
  isExpanded,
  logo,
  logoVariant,
  variant,
  withSidenav,
  ...props
}) {
  const [drawer, toggleDrawer] = useToggle(false);
  useLockBodyScroll(drawer);

  let { width } = useWindowSize();
  let smallerWidth = width <= 991;
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
        {smallerWidth ? (
          <div className={clsx(styles.contentMenuIcon)}>
            <Button variant="trans" spacing="none" onClick={toggleDrawer}>
              <AiOutlineMenu />
            </Button>
          </div>
        ) : null}
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
        {contentLeft && !smallerWidth ? (
          <div className={styles.contentLeft}>{contentLeft}</div>
        ) : null}

        {smallerWidth ? (
          <div
            className={clsx(styles.contentMenu, {
              [styles.open]: drawer,
            })}
            onClick={toggleDrawer}
          >
            {contentLeft}
            <Divider />
            {contentRight}
          </div>
        ) : null}
        {contentRight && !smallerWidth ? (
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
