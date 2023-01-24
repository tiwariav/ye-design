import { clsx } from "clsx";
import { CSSProperties, ReactNode, useMemo, useRef } from "react";
import { RiMenu5Fill } from "react-icons/ri/index.js";
import { useToggle, useWindowScroll, useWindowSize } from "react-use";
import { useScrollDirection } from "wo-library/hooks/index.js";
import { BREAKPOINTS } from "../../../styles/media.js";
import styleUtils from "../../../styles/utils/flex.module.css";
import { Button, Container } from "../../atoms/index.js";
import styles from "./topNav.module.css";
import TopNavItem from "./TopNavItem.js";

const variantOptions = ["basic", "transparent", "flat", "underlined"] as const;

interface TopNavProps {
  banner?: ReactNode;
  className?: string;
  contentLeft?: ReactNode;
  contentMenu?: ReactNode;
  contentRight?: ReactNode;
  drawer?: boolean;
  expandedHeight?: number;
  hideOnScroll?: boolean | "contentLeft";
  innerClassNames?: {
    isExpanded?: string;
    container?: string;
  };
  isExpanded?: boolean;
  leftNavIcon?: ReactNode;
  logo?: ReactNode;
  logoVariant?: string;
  multiRow?: boolean;
  rightNavIcon?: ReactNode;
  sideNavToggle?: boolean;
  style?: CSSProperties;
  toggleSideNav?: Function;
  toggleDrawer?: Function;
  variant?: (typeof variantOptions)[number];
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
  hideOnScroll,
  innerClassNames = {},
  isExpanded,
  leftNavIcon,
  logo,
  logoVariant = "basic",
  multiRow,
  rightNavIcon,
  sideNavToggle,
  style,
  toggleSideNav,
  toggleDrawer,
  variant,
  withSideNav,
  ...props
}: TopNavProps) {
  const { width } = useWindowSize();
  const [localDrawer, toggleLocalDrawer] = useToggle(false);
  const scrollDirection = useScrollDirection();
  // NOTE: smallerWidth is false server side because width is Infinity
  const smallerWidth = useMemo(() => {
    if (!Number.isFinite(width)) return;
    return width < BREAKPOINTS.lg;
  }, [width]);
  const ref = useRef<HTMLDivElement>();
  const contentLeftRef = useRef<HTMLDivElement>();
  const { y: scrollY } = useWindowScroll();

  const showDrawer = drawer || localDrawer;
  const rootStyle = useMemo(() => {
    if (!(hideOnScroll || ref.current)) return {};
    const isScrollingDown =
      scrollDirection === "down" && scrollY > ref.current.offsetHeight;
    if (!isScrollingDown || showDrawer) return {};
    if (hideOnScroll === "contentLeft" && contentLeftRef.current) {
      return {
        transform: `translateY(-${contentLeftRef.current.offsetHeight + 16}px)`,
      };
    }
    return { transform: "translateY(-100%)" };
  }, [hideOnScroll, scrollDirection, scrollY, showDrawer]);

  const hasContextMenu = contentMenu || contentLeft || contentRight;

  return (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        styles[`is-${variant}`],
        {
          [styles.withSideNav]: withSideNav,
          [styles.sideNavToggled]: sideNavToggle,
          [styles.hasDrawer]: showDrawer,
        },
        className,
        innerClassNames
          ? {
              [innerClassNames.isExpanded]: isExpanded,
            }
          : {}
      )}
      style={{ ...rootStyle, ...style }}
      {...props}
    >
      {banner && (
        <div className={clsx(styles.container, styles.banner)}>{banner}</div>
      )}
      <Container
        className={clsx(styles.container, innerClassNames.container, {
          [styles.hasMultiRow]: multiRow,
        })}
      >
        {/* left nav icon */}
        {smallerWidth !== false && withSideNav && leftNavIcon !== null && (
          <div className={clsx(styles.contentMenuIcon)}>
            <Button variant="trans" spacing="none" onClick={toggleSideNav}>
              {leftNavIcon || <RiMenu5Fill />}
            </Button>
          </div>
        )}
        {/* logo */}
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
        {/* left content */}
        {(smallerWidth !== true || multiRow) && contentLeft && (
          <div ref={contentLeftRef} className={styles.contentLeft}>
            {contentLeft}
          </div>
        )}
        {hasContextMenu && (
          <div
            className={clsx(
              styleUtils.flexAlignCenter,
              styles.contentRightWrapper
            )}
          >
            {/* right content */}
            {contentRight && (
              <div
                className={clsx(
                  styleUtils.flexAlignCenter,
                  styles.contentRight
                )}
              >
                {contentRight}
              </div>
            )}
            {/* right nav icon */}
            {!multiRow &&
              smallerWidth !== false &&
              rightNavIcon !== null &&
              hasContextMenu && (
                <TopNavItem
                  className={clsx(
                    styles.contentMenuIcon,
                    styles.contentMenuIconRight
                  )}
                >
                  <Button
                    variant="trans"
                    spacing="none"
                    onClick={toggleDrawer || toggleLocalDrawer}
                  >
                    {rightNavIcon || <RiMenu5Fill />}
                  </Button>
                </TopNavItem>
              )}
          </div>
        )}
      </Container>
      {/* right content menu */}
      {smallerWidth && hasContextMenu && (
        <div
          className={clsx(styleUtils.flexColumn, styles.contentMenu, {
            [styles.open]: showDrawer,
          })}
        >
          {contentMenu || (
            <>
              <div
                className={clsx(styleUtils.flexColumn, styles.contentMenuTop)}
              >
                {contentLeft}
              </div>
              <div
                className={clsx(
                  styleUtils.flexColumn,
                  styles.contentMenuBottom
                )}
              >
                {contentRight}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
