import { IconMenu } from "@tabler/icons-react";
import { clsx } from "clsx";
import { isEmpty, isObject } from "lodash-es";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { useLockBodyScroll, useScrollbarWidth, useWindowSize } from "react-use";
import { cssVariable } from "wo-library/tools/css.js";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import usePropRef from "../../../hooks/usePropRef.js";
import { BREAKPOINTS } from "../../../styles/media.js";
import { ButtonProps } from "../../atoms/Button/Button.js";
import { Button } from "../../atoms/index.js";
import styles from "./sideNav.module.css";

const CSS_VAR_OFFSET = "--ye-layout-side-nav-offset";
const CSS_VAR_TOGGLE_WIDTH = "--ye-layout-side-nav-toggle-width";

export function SideNavToggle({ children, ...props }: ButtonProps) {
  const layoutState = LayoutContext.useContextState();
  const layoutDispatch = LayoutContext.useContextDispatch();
  return (
    <Button
      onClick={() => {
        layoutDispatch.dispatch.updateSideNav({
          isToggled: !layoutState.sideNav.isToggled,
        });
      }}
      spacing="none"
      variant="borderless"
      {...props}
    >
      {children ?? <IconMenu />}
    </Button>
  );
}

export interface SideNavProps extends ComponentPropsWithoutRef<"div"> {
  hasCompactMode?: boolean;
  isFullHeight?: boolean;
  sticky?:
    | {
        bottom?: boolean;
        topNavOffset?: boolean;
      }
    | boolean;
  toggleIcon?: ReactNode;
}

const SideNavWrapper = forwardRef<HTMLDivElement, SideNavProps>(
  function SideNavWrapperRender(
    {
      children,
      className,
      hasCompactMode = true,
      isFullHeight,
      sticky,
      style,
      toggleIcon,
      ...props
    }: SideNavProps,
    ref,
  ) {
    const layoutState = LayoutContext.useContextState();
    const layoutDispatch = LayoutContext.useContextDispatch();
    const { innerRef, setInnerRef } = usePropRef([
      ref,
      layoutState.refs.sideNav,
    ]);

    const { bottom = false, topNavOffset = false } = isObject(sticky)
      ? sticky
      : {};
    const scrollWidth = useScrollbarWidth();
    const { width } = useWindowSize();
    const isMobile = width < BREAKPOINTS.sm;

    useLockBodyScroll(!!isMobile && !!layoutState.sideNav.isToggled);

    useEffect(() => {
      layoutDispatch.dispatch.updateSideNav({ hasCompactMode });
    }, [hasCompactMode]);

    useLayoutEffect(() => {
      if (!innerRef.current) return;
      const topNavRef = layoutState.refs.topNav;
      const newProperties: Record<string, string> = {};
      let scrollHeight = innerRef.current.scrollHeight;
      if (topNavOffset && topNavRef.current) {
        newProperties[CSS_VAR_OFFSET] = `${topNavRef.current.offsetHeight}px`;
        scrollHeight += topNavRef.current.offsetHeight;
      }
      if (scrollHeight > innerRef.current.clientHeight) {
        const toggleWidth = Number.parseInt(cssVariable(CSS_VAR_TOGGLE_WIDTH));
        if (toggleWidth) {
          newProperties[CSS_VAR_TOGGLE_WIDTH] = `${
            toggleWidth + (scrollWidth ?? 0) / 2
          }px`;
        }
      }
      for (const [key, value] of Object.entries(newProperties)) {
        innerRef.current.style.setProperty(key, value);
      }
    }, [innerRef, layoutState.refs.topNav, scrollWidth, topNavOffset, width]);

    return (
      <>
        <div
          className={clsx(styles.backdrop, {
            [styles.backdropToggled]: layoutState.sideNav.isToggled,
          })}
          onClick={() =>
            layoutDispatch.dispatch.updateSideNav({
              isToggled: !layoutState.sideNav.isToggled,
            })
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              layoutDispatch.dispatch.updateSideNav({
                isToggled: !layoutState.sideNav.isToggled,
              });
            }
          }}
          role="button"
          tabIndex={0}
        />
        <div
          className={clsx(
            styles.root,
            {
              [styles.hasCompactMode]: hasCompactMode,
              [styles.isFullHeight]: isFullHeight,
              [styles.isSticky]: !!sticky || isFullHeight,
              [styles.isStickyBottom]: bottom,
              [styles.isToggled]: layoutState.sideNav.isToggled,
            },
            className,
          )}
          ref={setInnerRef}
          style={{ ...style }}
          {...props}
        >
          {toggleIcon !== null &&
            (toggleIcon ?? (
              <div className={styles.toggle}>
                <SideNavToggle />
              </div>
            ))}
          <SideNavInner toggleIcon={toggleIcon}>{children}</SideNavInner>
        </div>
      </>
    );
  },
);

const SideNavInner = ({
  children,
}: Pick<SideNavProps, "children" | "toggleIcon">) => (
  <div className={styles.wrapperOuter}>
    <div className={styles.wrapperInner}>{children}</div>
  </div>
);

const SideNav = forwardRef<HTMLDivElement, SideNavProps>(
  function SideNavRender(props, ref) {
    const layoutState = LayoutContext.useContextState();
    return isEmpty(layoutState) ? (
      <LayoutContext.LayoutProvider>
        <SideNavWrapper {...props} ref={ref} />
      </LayoutContext.LayoutProvider>
    ) : (
      <SideNavWrapper {...props} ref={ref} />
    );
  },
);

export default SideNav;
