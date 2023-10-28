/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  variant-flat, variant-underlined, variant-transparent, variant-logo-hanging
]}] */

import { IconMenu } from "@tabler/icons-react";
import { clsx } from "clsx";
import { isObject } from "lodash-es";
import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useToggle, useWindowSize } from "react-use";
import { useScrollDirection } from "wo-library/hooks";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import usePropRef from "../../../hooks/usePropRef.js";
import { BREAKPOINTS } from "../../../styles/media.js";
import { FlexAlignCenterDiv, FlexColDiv } from "../../../wrappers/div.js";
import { ButtonProps } from "../../atoms/Button/Button.js";
import { Button, Container } from "../../atoms/index.js";
import TopNavItem from "./TopNavItem.js";
import styles from "./topNav.module.css";

type TopNavVariant =
  | (typeof TOPNAV_VARIANTS)[number]
  | {
      expanded?: (typeof TOPNAV_VARIANTS)[number];
      normal?: (typeof TOPNAV_VARIANTS)[number];
    };

function useVariantClassName({
  topNavExpanded,
  variant,
}: {
  topNavExpanded?: boolean;
  variant?: TopNavVariant;
}) {
  return useMemo(() => {
    if (isObject(variant)) {
      return topNavExpanded && variant.expanded
        ? styles[`variant-${variant.expanded}`]
        : variant.normal
        ? styles[`variant-${variant.normal}`]
        : "";
    }
    return variant && styles[`variant-${variant}`];
  }, [topNavExpanded, variant]);
}

function useScrollUpdates({
  containerRef,
  contentLeftRef,
  hideOnScroll,
  rootRef,
  showDrawer,
}: {
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  contentLeftRef: React.MutableRefObject<HTMLDivElement | null>;
  hideOnScroll?: "contentLeft" | boolean;
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  showDrawer: boolean;
}) {
  const { direction, y: scrollY } = useScrollDirection(containerRef);
  const transform = useMemo(() => {
    if (
      !hideOnScroll ||
      direction !== "down" ||
      showDrawer ||
      !rootRef.current ||
      scrollY < rootRef.current.offsetHeight
    )
      return 0;
    if (hideOnScroll === "contentLeft" && contentLeftRef.current) {
      return `${contentLeftRef.current.offsetHeight + 16}px`;
    }
    return "-100%";
  }, [contentLeftRef, hideOnScroll, rootRef, direction, scrollY, showDrawer]);

  return { scrollY, transform };
}

export const IconMenuItem = ({ children, ...props }: ButtonProps) => (
  <TopNavItem className={styles.contentMenuIcon}>
    <Button
      aria-label="Open Top Menu"
      spacing="none"
      variant="borderless"
      {...props}
    >
      {children || <IconMenu />}
    </Button>
  </TopNavItem>
);

export const TOPNAV_VARIANTS = ["transparent", "flat", "underlined"] as const;
const LOGO_VARIANTS = ["hanging"] as const;

export interface TopNavProps {
  banner?: ReactNode;
  className?: string;
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  contentLeft?: ReactNode;
  contentMenu?: ReactNode;
  contentRight?: ReactNode;
  innerClassNames?: {
    container?: string;
    contentMenu?: string;
    isExpanded?: string;
  };
  leftNavIcon?: ReactNode;
  logo?: ReactNode;
  logoVariant?: (typeof LOGO_VARIANTS)[number];
  multiRow?: boolean;
  rightNavIcon?: ReactNode;
  sideNavIcon?: ReactNode;
  sticky?:
    | {
        hideOnScroll?: "contentLeft" | boolean;
        shrinkOffset?: number;
      }
    | boolean;
  style?: CSSProperties;
  variant?: TopNavVariant;
}

const TopNav = forwardRef<HTMLDivElement, TopNavProps>(
  (
    {
      banner,
      className,
      containerRef,
      contentLeft,
      contentMenu,
      contentRight,
      innerClassNames = {},
      leftNavIcon,
      logo,
      logoVariant,
      multiRow,
      rightNavIcon,
      sideNavIcon,
      sticky,
      style,
      variant,
      ...props
    },
    ref,
  ) => {
    const layoutState = LayoutContext.useContextState();
    const layoutDispatch = LayoutContext.useContextDispatch();
    const [smallerWidth, setSmallerWidth] = useState<boolean>();
    const [showDrawer, toggleDrawer] = useToggle(false);
    const { width } = useWindowSize();
    const [contentMenuHeight, setContentMenuHeight] = useState<number>();

    const contentMenuRef = useRef<HTMLDivElement>(null);
    const contentLeftRef = useRef<HTMLDivElement>(null);
    const { innerRef, setInnerRef } = usePropRef(
      ref || layoutState.refs.topNav,
    );

    const { hideOnScroll = false, shrinkOffset = -1 } = isObject(sticky)
      ? sticky
      : {};
    const hasContextMenu = contentMenu || contentLeft || contentRight;

    const { scrollY, transform } = useScrollUpdates({
      containerRef,
      contentLeftRef,
      hideOnScroll,
      rootRef: innerRef,
      showDrawer,
    });
    const topNavExpanded = scrollY < shrinkOffset;
    const variantClassName = useVariantClassName({ topNavExpanded, variant });

    useEffect(() => {
      setContentMenuHeight(contentMenuRef.current?.offsetHeight);
    }, [smallerWidth]);

    useEffect(() => {
      layoutDispatch.dispatch?.updateTopNav({
        isHidden: !!transform,
      });
    }, [layoutDispatch.dispatch, transform]);

    useLayoutEffect(() => {
      setSmallerWidth(width <= BREAKPOINTS.lg);
    }, [width]);

    return (
      <div
        className={clsx(
          styles.root,
          variantClassName,
          {
            [styles.hasDrawer]: showDrawer,
            [styles.isSticky]: sticky,
          },
          className,
          topNavExpanded && [styles.isExpanded, innerClassNames.isExpanded],
        )}
        ref={setInnerRef}
        style={{ transform: `translateY(${transform})`, ...style }}
        {...props}
      >
        {banner && <div className={styles.banner}>{banner}</div>}
        <div className={styles.wrapper}>
          <Container
            className={clsx(styles.container, innerClassNames.container, {
              [styles.hasMultiRow]: multiRow,
            })}
          >
            {sideNavIcon && (
              <div className={styles.sideNavToggle}>{sideNavIcon}</div>
            )}
            {/* logo */}
            {logo && (
              <div
                className={clsx(
                  styles["logo-container"],
                  logoVariant && styles[`variant-logo-${logoVariant}`],
                )}
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
              <FlexAlignCenterDiv className={styles.contentRightWrapper}>
                {/* right content */}
                {contentRight && (
                  <FlexAlignCenterDiv className={styles.contentRight}>
                    {contentRight}
                  </FlexAlignCenterDiv>
                )}
                {/* right nav icon */}
                {!multiRow &&
                  smallerWidth !== false &&
                  rightNavIcon !== null &&
                  hasContextMenu && (
                    <IconMenuItem onClick={() => toggleDrawer()}>
                      {rightNavIcon}
                    </IconMenuItem>
                  )}
              </FlexAlignCenterDiv>
            )}
          </Container>
          {/* right content menu */}
          {smallerWidth && hasContextMenu && (
            <div
              className={clsx(
                styles.contentMenuWrapper,
                contentMenuHeight === undefined
                  ? styles.contentMenuMeasuring
                  : styles.contentMenuMeasured,
                {
                  [styles.contentMenuIsOpen]: showDrawer,
                },
              )}
              ref={contentMenuRef}
              style={showDrawer ? { height: contentMenuHeight } : {}}
            >
              <div className={styles.shadowWrapper}>
                <FlexColDiv
                  className={clsx(
                    styles.contentMenu,
                    innerClassNames.contentMenu,
                  )}
                >
                  {contentMenu || (
                    <>
                      <FlexColDiv className={styles.contentMenuTop}>
                        {contentLeft}
                      </FlexColDiv>
                      <FlexColDiv className={styles.contentMenuBottom}>
                        {contentRight}
                      </FlexColDiv>
                    </>
                  )}
                </FlexColDiv>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default TopNav;
