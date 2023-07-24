import { clsx } from "clsx";
import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useToggle } from "react-use";

import { SideNavProps } from "../SideNav/SideNav.js";
import { TopNavProps } from "../TopNav/TopNav.js";
import styles from "./page.module.css";

interface PageProps {
  children?: ReactNode;
  hero?: ReactNode;
  innerClassNames?: {
    content?: string;
    hero?: string;
    sideNav?: string;
  };
  isCentered?: boolean;
  sideNav?: ReactElement;
  sideNavIsSticky?: boolean;
  sideNavOnTop?: boolean;
  topNav?: ReactElement;
  topNavCanExpand?: boolean;
  topNavIsFixed?: boolean;
  topNavShrinkOffset?: number;
}

export default function Page({
  children,
  hero,
  innerClassNames = {},
  isCentered,
  sideNav,
  sideNavIsSticky,
  sideNavOnTop,
  topNav,
  topNavCanExpand,
  topNavIsFixed,
  topNavShrinkOffset = 0,
}: PageProps) {
  // TODO: create a LayoutProvider to manage topnav and sidenav states
  const topNavRef = React.useRef<HTMLDivElement>(null);
  const [spacerRef, spacerInView] = useInView();
  const [sideNavToggle, toggleSideNav] = useToggle(false);

  const [topNavMaxHeight, setTopNavMaxHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (topNavRef.current) {
      const scopeTopNavMaxHeight = topNavRef.current.offsetHeight;
      if (!topNavMaxHeight) {
        setTopNavMaxHeight(scopeTopNavMaxHeight);
        setLoading(false);
      }
    }
  }, [topNavMaxHeight]);

  const topNavExpanded = useMemo(
    () => topNavIsFixed && spacerInView,
    [spacerInView, topNavIsFixed],
  );

  const clonedTopNav = useMemo(() => {
    if (topNav) {
      const extraProps: TopNavProps = {
        sideNavToggle,
        toggleSideNav,
        variant: undefined,
        withSideNav: !!sideNav,
      };
      if (topNavExpanded) {
        extraProps.isExpanded = true;
      }
      if (topNavExpanded || loading) {
        extraProps.variant = "transparent";
      }
      return React.cloneElement(topNav, extraProps);
    }
    return null;
  }, [topNav, sideNav, sideNavToggle, toggleSideNav, topNavExpanded, loading]);

  const clonedSideNav = useMemo(() => {
    if (sideNav) {
      const extraProps: SideNavProps = {};
      return React.cloneElement(sideNav, extraProps);
    }
    return null;
  }, [sideNav]);

  return (
    <div className={clsx(styles.root)}>
      {topNav && (
        <div
          className={clsx({
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasSideNavToggle]: sideNavToggle,
            [styles.isFixed]: topNavIsFixed,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.sideNavTop]: sideNavOnTop,
          })}
          ref={topNavRef}
        >
          {clonedTopNav}
        </div>
      )}
      <main
        className={clsx(styles.main, {
          [styles.isCentered]: isCentered,
          [styles.withTopNavFixed]: topNavIsFixed,
        })}
      >
        {topNavCanExpand && (
          <div
            className={styles.spacer}
            ref={spacerRef}
            style={{ top: topNavMaxHeight + topNavShrinkOffset }}
          />
        )}
        {hero && <div>{hero}</div>}
        <div className={styles.container}>
          {sideNav && (
            <div
              className={clsx(styles.sideNav, innerClassNames.sideNav, {
                // eslint-disable-next-line css-modules/no-undef-class
                [styles.isSticky]: sideNavIsSticky,
                [styles.sideNavToggle]: sideNavToggle,
                // eslint-disable-next-line css-modules/no-undef-class
                [styles.topNavTop]: sideNavIsSticky && !sideNavOnTop,
              })}
            >
              <div
                onClick={() => {
                  if (sideNavToggle) toggleSideNav();
                }}
                className={styles.sideNavBackdrop}
              />
              {clonedSideNav}
            </div>
          )}
          <div className={styles.content}>{children}</div>
        </div>
      </main>
    </div>
  );
}
