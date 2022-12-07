import { clsx } from "clsx";
import { ReactNode } from "react";
import { RiMenu5Fill } from "react-icons/ri/index.js";
import { useLockBodyScroll, useWindowSize } from "react-use";
import { BREAKPOINTS } from "../../../styles/media.js";
import { Button, Container, Divider } from "../../atoms/index.js";
import styles from "./topNav.module.css";
const variantOptions = ["basic", "transparent", "flat", "underlined"] as const;

interface TopNavProps {
  banner?: ReactNode;
  className?: string;
  contentLeft?: ReactNode;
  contentMenu?: ReactNode;
  contentRight?: ReactNode;
  drawer: boolean;
  expandedHeight: number;
  innerClassNames: {
    isExpanded?: string;
    container?: string;
  };
  isExpanded?: boolean;
  leftNavIcon?: ReactNode;
  logo?: ReactNode;
  logoVariant: string;
  rightNavIcon?: ReactNode;
  sideNavToggle?: boolean;
  toggleSideNav?: Function;
  toggleDrawer?: Function;
  variant?: typeof variantOptions[number];
  withSideNav?: boolean;
}

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
}: TopNavProps) {
  const { width } = useWindowSize();
  const smallerWidth = width < BREAKPOINTS.lg;
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
      {banner && (
        <div className={clsx(styles.container, styles.banner)}>{banner}</div>
      )}
      <Container className={clsx(styles.container, innerClassNames.container)}>
        {smallerWidth && (withSideNav || leftNavIcon) && (
          <div className={clsx(styles.contentMenuIcon)}>
            <Button variant="trans" spacing="none" onClick={toggleSideNav}>
              {leftNavIcon || <RiMenu5Fill />}
            </Button>
          </div>
        )}
        {logo && (
          <div
            className={clsx(
              styles["logo-container"],
              styles[`is-logo-${logoVariant}`]
            )}
            style={isExpanded ? { height: expandedHeight } : undefined}
          >
            <div className={styles.logo}>{logo}</div>
          </div>
        )}
        {smallerWidth && (
          <div className={clsx(styles.contentMenuIcon)}>
            {rightNavIcon ||
              ((contentLeft || contentRight || contentMenu) && (
                <Button variant="trans" spacing="none" onClick={toggleDrawer}>
                  <RiMenu5Fill />
                </Button>
              ))}
          </div>
        )}
        {contentLeft && Number.isFinite(width) && !smallerWidth && (
          <div className={styles.contentLeft}>{contentLeft}</div>
        )}

        {smallerWidth && (
          <div
            className={clsx(styles.contentMenu, {
              [styles.open]: drawer,
            })}
          >
            {contentLeft}
            <Divider />
            {contentRight}
          </div>
        )}

        {contentRight && Number.isFinite(width) && !smallerWidth && (
          <div className={styles.contentRight}>{contentRight}</div>
        )}
      </Container>
    </div>
  );
}
