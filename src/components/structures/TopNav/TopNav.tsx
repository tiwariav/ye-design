/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  variant-flat, variant-underlined, variant-transparent, variant-logo-hanging
]}] */

import { IconMenu } from "@tabler/icons-react";
import { clsx } from "clsx";
import { isEmpty, isObject } from "lodash-es";
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
import { useWindowSize } from "react-use";
import { useScrollDirection } from "wo-library/hooks/index.js";

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
  hideOffset = 0,
  hideOnScroll,
  rootRef,
  showDrawer = false,
}: {
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  contentLeftRef: React.MutableRefObject<HTMLDivElement | null>;
  hideOffset?: number;
  hideOnScroll?: "contentLeft" | boolean;
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  showDrawer?: boolean;
}) {
  const { direction, y: scrollY } = useScrollDirection(containerRef);
  const transform = useMemo(() => {
    if (
      !hideOnScroll ||
      direction !== "down" ||
      showDrawer ||
      !rootRef.current ||
      scrollY + hideOffset < rootRef.current.offsetHeight
    )
      return 0;
    if (hideOnScroll === "contentLeft" && contentLeftRef.current) {
      return `${contentLeftRef.current.offsetHeight + 16}px`;
    }
    return `-${rootRef.current.scrollHeight}px`;
  }, [
    contentLeftRef,
    hideOffset,
    hideOnScroll,
    rootRef,
    direction,
    scrollY,
    showDrawer,
  ]);
  return { direction, scrollY, transform };
}

export const IconMenuItem = ({ children, ...props }: ButtonProps) => (
  <TopNavItem className={styles.contentMenuIcon}>
    <Button
      aria-label="Open Top Menu"
      spacing="none"
      variant="borderless"
      {...props}
    >
      {children ?? <IconMenu />}
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
  contentMiddle?: ReactNode;
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
        hideOffset?: number;
        hideOnScroll?: "contentLeft" | boolean;
        shrinkOffset?: number;
      }
    | boolean;
  style?: CSSProperties;
  variant?: TopNavVariant;
}

const TopNavWrapper = forwardRef<HTMLDivElement, TopNavProps>(
  function TopNavWrapperRender(
    {
      banner,
      className,
      containerRef,
      contentLeft,
      contentMenu,
      contentMiddle,
      contentRight,
      innerClassNames = {},
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
  ) {
    const layoutState = LayoutContext.useContextState();
    const layoutDispatch = LayoutContext.useContextDispatch();
    const [smallerWidth, setSmallerWidth] = useState<boolean>();
    const { width } = useWindowSize();
    const [contentMenuHeight, setContentMenuHeight] = useState<number>();
    const [isReady, setIsReady] = useState(false);

    const contentMenuRef = useRef<HTMLDivElement>(null);
    const contentLeftRef = useRef<HTMLDivElement>(null);
    const { innerRef, setInnerRef } = usePropRef(
      ref ?? layoutState.refs.topNav,
    );
    const topNavMaxHeight = useRef<number>(0);

    const {
      hideOffset = 0,
      hideOnScroll = false,
      shrinkOffset = -1,
    } = isObject(sticky) ? sticky : {};
    const hasContentMenu = contentMenu ?? contentLeft ?? contentRight;

    const { direction, scrollY, transform } = useScrollUpdates({
      containerRef,
      contentLeftRef,
      hideOffset,
      hideOnScroll,
      rootRef: innerRef,
      showDrawer: !!layoutState.topNav.isDrawerToggled,
    });

    const topNavExpanded = useMemo(() => {
      const currentHeight = innerRef?.current?.offsetHeight ?? 0;
      topNavMaxHeight.current = Math.max(
        topNavMaxHeight.current,
        currentHeight,
      );
      const diff = topNavMaxHeight.current - currentHeight;
      return scrollY + diff < shrinkOffset;
    }, [scrollY, innerRef, shrinkOffset]);

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

    useLayoutEffect(() => {
      setIsReady(true);
    }, []);

    return (
      <div
        className={clsx(
          styles.root,
          variantClassName,
          {
            [styles.hasDrawer]: layoutState.topNav.isDrawerToggled,
            [styles.isScrolled]: direction,
            [styles.isSticky]: sticky && isReady,
          },
          ((shrinkOffset > 0 && typeof window === "undefined") ||
            (topNavExpanded && isReady)) && [
            styles.isExpanded,
            innerClassNames.isExpanded,
          ],
          className,
        )}
        ref={setInnerRef}
        style={{
          transform: isReady ? `translateY(${transform})` : "none",
          ...style,
        }}
        {...props}
      >
        {banner && <div className={styles.banner}>{banner}</div>}
        <div className={styles.wrapper}>
          <Container
            className={clsx(styles.container, innerClassNames.container, {
              [styles.hasMultiRow]: multiRow,
            })}
          >
            <FlexAlignCenterDiv>
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
                <FlexAlignCenterDiv
                  className={styles.contentLeft}
                  ref={contentLeftRef}
                >
                  {contentLeft}
                </FlexAlignCenterDiv>
              )}
            </FlexAlignCenterDiv>

            {(smallerWidth === false || multiRow) && contentMiddle && (
              <FlexAlignCenterDiv>{contentMiddle}</FlexAlignCenterDiv>
            )}

            {hasContentMenu && (
              <FlexAlignCenterDiv>
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
                  hasContentMenu && (
                    <IconMenuItem
                      onClick={() =>
                        layoutDispatch.dispatch.updateTopNav({
                          isDrawerToggled: !layoutState.topNav.isDrawerToggled,
                        })
                      }
                    >
                      {rightNavIcon}
                    </IconMenuItem>
                  )}
              </FlexAlignCenterDiv>
            )}
          </Container>
          {/* right content menu */}
          {smallerWidth && hasContentMenu && (
            <div
              className={clsx(
                styles.contentMenuWrapper,
                contentMenuHeight === undefined
                  ? styles.contentMenuMeasuring
                  : styles.contentMenuMeasured,
                {
                  [styles.contentMenuIsOpen]:
                    layoutState.topNav.isDrawerToggled,
                },
              )}
              ref={contentMenuRef}
              style={
                layoutState.topNav.isDrawerToggled
                  ? { height: contentMenuHeight }
                  : {}
              }
            >
              <div className={styles.shadowWrapper}>
                <FlexColDiv
                  className={clsx(
                    styles.contentMenu,
                    innerClassNames.contentMenu,
                  )}
                >
                  {contentMenu ?? (
                    <>
                      {contentLeft && (
                        <FlexColDiv className={styles.contentMenuTop}>
                          {contentLeft}
                        </FlexColDiv>
                      )}
                      {contentMiddle && (
                        <FlexColDiv>{contentMiddle}</FlexColDiv>
                      )}
                      {contentRight && (
                        <FlexColDiv className={styles.contentMenuBottom}>
                          {contentRight}
                        </FlexColDiv>
                      )}
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

const TopNav = forwardRef<HTMLDivElement, TopNavProps>(
  function TopNavRender(props, ref) {
    const layoutState = LayoutContext.useContextState();
    return isEmpty(layoutState) ? (
      <LayoutContext.LayoutProvider>
        <TopNavWrapper {...props} ref={ref} />
      </LayoutContext.LayoutProvider>
    ) : (
      <TopNavWrapper {...props} ref={ref} />
    );
  },
);

export default TopNav;
