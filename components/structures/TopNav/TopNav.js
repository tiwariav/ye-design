import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { RiMenu5Fill } from "react-icons/ri";
import { useLockBodyScroll, useWindowSize } from "react-use";
import { Button } from "../../atoms/forms";
import { Container, Divider } from "../../atoms/sections";
import styles from "./topNav.module.css";
const variantOptions = ["basic", "transparent", "flat", "underlined"];

export default function TopNav({
  banner,
  className,
  contentLeft,
  contentMenu,
  contentRight,
  drawer,
  expandedHeight = 72,
  isExpanded,
  leftNavIcon,
  logo,
  logoVariant,
  rightNavIcon,
  sideNavToggle,
  toggleSideNav,
  toggleDrawer,
  variant,
  withSideNav,
  ...props
}) {
  let { width } = useWindowSize();
  let smallerWidth = width <= 991;
  useLockBodyScroll(smallerWidth && drawer);

  return (
    <div
      className={clsx(
        styles.root,
        styles[`is-${variant}`],
        {
          [styles.isExpanded]: isExpanded,
          [styles.withSideNav]: withSideNav,
          [styles.sideNavToggled]: sideNavToggle,
        },
        className
      )}
      {...props}
    >
      {banner ? (
        <div className={clsx(styles.container, styles.banner)}>{banner}</div>
      ) : null}
      <Container className={styles.container}>
        {smallerWidth && (withSideNav || leftNavIcon) ? (
          <div className={clsx(styles.contentMenuIcon)}>
            <Button variant="trans" spacing="none" onClick={toggleSideNav}>
              {leftNavIcon ? leftNavIcon : <RiMenu5Fill />}
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
        {smallerWidth ? (
          <div className={clsx(styles.contentMenuIcon)}>
            {rightNavIcon ? (
              rightNavIcon
            ) : (
              <Button variant="trans" spacing="none" onClick={toggleDrawer}>
                <RiMenu5Fill />
              </Button>
            )}
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

TopNav.propTypes = {
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
  withSideNav: PropTypes.bool,
};

TopNav.defaultProps = {
  logoVariant: "basic",
};
