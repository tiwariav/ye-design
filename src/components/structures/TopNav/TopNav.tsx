/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-flat, is-underlined, is-logo-hanging
]}] */

import { IconMenu } from "@tabler/icons-react";
import { clsx } from "clsx";
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useToggle, useWindowScroll, useWindowSize } from "react-use";
import { useScrollDirection } from "wo-library/hooks/index.js";

import { BREAKPOINTS } from "../../../styles/media.js";
import styleUtils from "../../../styles/utils/flex.module.css";
import { Button, Container } from "../../atoms/index.js";
import TopNavItem from "./TopNavItem.js";
import styles from "./topNav.module.css";

const variantOptions = ["transparent", "flat", "underlined"] as const;
const LOGO_VARIANTS = ["hanging"] as const;

export interface TopNavProps {
  banner?: ReactNode;
  className?: string;
  contentLeft?: ReactNode;
  contentMenu?: ReactNode;
  contentRight?: ReactNode;
  drawer?: boolean;
  expandedHeight?: number;
  hideOnScroll?: "contentLeft" | boolean;
  innerClassNames?: {
    container?: string;
    isExpanded?: string;
  };
  isExpanded?: boolean;
  leftNavIcon?: ReactNode;
  logo?: ReactNode;
  logoVariant?: (typeof LOGO_VARIANTS)[number];
  multiRow?: boolean;
  rightNavIcon?: ReactNode;
  sideNavToggle?: boolean;
  style?: CSSProperties;
  toggleDrawer?: (value?: boolean) => void;
  toggleSideNav?: (value?: boolean) => void;
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
  logoVariant,
  multiRow,
  rightNavIcon,
  sideNavToggle,
  style,
  toggleDrawer,
  toggleSideNav,
  variant,
  withSideNav,
  ...props
}: TopNavProps) {
  const { width } = useWindowSize();
  const [localDrawer, toggleLocalDrawer] = useToggle(false);
  const scrollDirection = useScrollDirection();
  const [smallerWidth, setSmallerWidth] = useState<boolean>();

  const ref = useRef<HTMLDivElement>(null);
  const contentLeftRef = useRef<HTMLDivElement>(null);
  const { y: scrollY } = useWindowScroll();

  const showDrawer = drawer || localDrawer;
  const rootStyle = useMemo(() => {
    if (!(hideOnScroll && ref.current)) return {};
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

  useEffect(() => {
    // NOTE: smallerWidth is undefined server side because width is Infinity
    setSmallerWidth(width <= BREAKPOINTS.lg);
  }, [width]);

  const hasContextMenu = contentMenu || contentLeft || contentRight;

  return (
    <div
      className={clsx(
        styles.root,
        variant && styles[`is-${variant}`],
        {
          [styles.hasDrawer]: showDrawer,
          [styles.sideNavToggled]: sideNavToggle,
          [styles.withSideNav]: withSideNav,
        },
        className,
        isExpanded && innerClassNames.isExpanded,
      )}
      ref={ref}
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
            <Button
              onClick={() => toggleSideNav?.()}
              spacing="none"
              variant="trans"
            >
              {leftNavIcon || <IconMenu />}
            </Button>
          </div>
        )}
        {/* logo */}
        {logo && (
          <div
            className={clsx(
              styles["logo-container"],
              logoVariant && styles[`is-logo-${logoVariant}`],
            )}
            style={isExpanded ? { height: expandedHeight } : undefined}
          >
            <div className={styles.logo}>{logo}</div>
          </div>
        )}
        {/* left content */}
        {(smallerWidth === false || multiRow) && contentLeft && (
          <div className={styles.contentLeft} ref={contentLeftRef}>
            {contentLeft}
          </div>
        )}
        {hasContextMenu && (
          <div
            className={clsx(
              styleUtils.flexAlignCenter,
              styles.contentRightWrapper,
            )}
          >
            {/* right content */}
            {contentRight && (
              <div
                className={clsx(
                  styleUtils.flexAlignCenter,
                  styles.contentRight,
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
                    styles.contentMenuIconRight,
                  )}
                >
                  <Button
                    onClick={() => toggleDrawer?.() || toggleLocalDrawer()}
                    spacing="none"
                    variant="trans"
                  >
                    {rightNavIcon || <IconMenu />}
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
                  styles.contentMenuBottom,
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
