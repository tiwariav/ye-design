import { clsx } from "clsx";
import { RiMenu5Fill } from "react-icons/ri";
import { useLockBodyScroll, useWindowSize } from "react-use";
import { Button, Container, Divider } from "../../atoms/index.js";
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
  innerClassNames = {},
  isExpanded,
  leftNavIcon,
  logo,
  logoVariant = "basic",
  rightNavIcon,
  sideNavToggle,
  toggleSideNav,
  toggleDrawer,
  variant,
  withSideNav,
  ...props
}: any) {
  const { width } = useWindowSize();
  const smallerWidth = width <= 991;

  useLockBodyScroll(!!(smallerWidth && drawer));

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
        className,
        innerClassNames
          ? {
              [innerClassNames.isExpanded]: isExpanded,
            }
          : {}
      )}
      {...props}
    >
      {banner ? (
        <div className={clsx(styles.container, styles.banner)}>{banner}</div>
      ) : null}
      <Container className={clsx(styles.container, innerClassNames.container)}>
        {smallerWidth && (withSideNav || leftNavIcon) ? (
          <div className={clsx(styles.contentMenuIcon)}>
            <Button variant="trans" spacing="none" onClick={toggleSideNav}>
              {leftNavIcon || <RiMenu5Fill />}
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
            {rightNavIcon || (
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
