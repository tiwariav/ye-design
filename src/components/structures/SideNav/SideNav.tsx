import { IconMenu } from "@tabler/icons-react";
import { clsx } from "clsx";
import { isEmpty, isObject } from "lodash-es";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useLayoutEffect,
} from "react";
import { useScrollbarWidth, useWindowSize } from "react-use";
import { cssVariable } from "wo-library/tools/css.js";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import usePropRef from "../../../hooks/usePropRef.js";
import { ButtonProps } from "../../atoms/Button/Button.js";
import { Button } from "../../atoms/index.js";
import styles from "./sideNav.module.css";

const CSS_VAR_OFFSET = "--ye-layout-side-nav-offset";
const CSS_VAR_TOGGLE_WIDTH = "--ye-layout-side-nav-toggle-width";

export function SideNavToggle({ children, onClick, ...props }: ButtonProps) {
  const layoutState = LayoutContext.useContextState();
  const layoutDispatch = LayoutContext.useContextDispatch();
  return (
    <Button
      onClick={(event) => {
        layoutDispatch.dispatch.updateSideNav({
          isToggled: !layoutState.sideNav.isToggled,
        });
        onClick?.(event);
      }}
      spacing="none"
      variant="borderless"
      {...props}
    >
      {children || <IconMenu />}
    </Button>
  );
}

export interface SideNavProps extends ComponentPropsWithoutRef<"div"> {
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
  (
    {
      children,
      className,
      isFullHeight,
      sticky,
      style,
      toggleIcon,
      ...props
    }: SideNavProps,
    ref,
  ) => {
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
            toggleWidth + (scrollWidth || 0) / 2
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
        />
        <div
          className={clsx(
            styles.root,
            {
              [styles.isFullHeight]: isFullHeight,
              [styles.isSticky]: sticky || isFullHeight,
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
            (toggleIcon || (
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

const SideNav = forwardRef<HTMLDivElement, SideNavProps>((props, ref) => {
  const layoutState = LayoutContext.useContextState();
  return isEmpty(layoutState) ? (
    <LayoutContext.LayoutProvider>
      <SideNavWrapper {...props} ref={ref} />
    </LayoutContext.LayoutProvider>
  ) : (
    <SideNavWrapper {...props} ref={ref} />
  );
});

export default SideNav;
