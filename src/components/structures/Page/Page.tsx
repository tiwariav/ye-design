import { clsx } from "clsx";
import React, { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useToggle } from "react-use";
import styles from "./page.module.css";

function Page({
  children,
  hero,
  isCentered,
  sideNav,
  sideNavIsSticky,
  sideNavOnTop,
  topNav,
  topNavIsFixed,
  topNavCanExpand,
  topNavShrinkOffset = 0,
}: any) {
  // TODO: create a LayoutProvider to manage topnav and sidenav states
  const topNavRef = React.useRef(null);
  const [spacerRef, spacerInView] = useInView();
  const [sideNavToggle, toggleSideNav] = useToggle(false);

  const [topNavMaxHeight, setTopNavMaxHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log("hello");

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
    [spacerInView, topNavIsFixed]
  );

  const clonedTopNav = useMemo(() => {
    if (topNav) {
      const extraProps = {
        sideNavToggle,
        toggleSideNav,
        withSideNav: !!sideNav,
      } as any;
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
      const extraProps = {
        sideNavToggle,
        toggleSideNav,
      } as any;
      if (topNavExpanded) {
        extraProps.topNavExpanded = true;
      }
      return React.cloneElement(sideNav, extraProps);
    }
    return null;
  }, [sideNav, sideNavToggle, toggleSideNav, topNavExpanded]);

  return (
    <div className={clsx(styles.root)}>
      {topNav ? (
        <div
          ref={topNavRef}
          className={clsx({
            [styles.isFixed]: topNavIsFixed,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.sideNavTop]: sideNavOnTop,
            [styles.hasSideNavToggle]: sideNavToggle,
          })}
        >
          {clonedTopNav}
        </div>
      ) : null}
      <main
        className={clsx(styles.main, {
          [styles.withTopNavFixed]: topNavIsFixed,
          [styles.isCentered]: isCentered,
        })}
      >
        {topNavCanExpand ? (
          <div
            ref={spacerRef}
            className={styles.spacer}
            style={{ top: topNavMaxHeight + topNavShrinkOffset }}
          />
        ) : null}
        {hero ? <div>{hero}</div> : null}
        <div className={styles.container}>
          {sideNav ? (
            <div
              className={clsx(styles.sideNav, {
                [styles.isSticky]: sideNavIsSticky,
                // eslint-disable-next-line css-modules/no-undef-class
                [styles.topNavTop]: sideNavIsSticky && !sideNavOnTop,
                [styles.sideNavToggle]: sideNavToggle,
              })}
            >
              <div
                className={styles.sideNavBackdrop}
                onClick={() => {
                  if (sideNavToggle) toggleSideNav();
                }}
              />
              {clonedSideNav}
            </div>
          ) : null}
          <div className={styles.content}>{children}</div>
        </div>
      </main>
    </div>
  );
}

export default Page;
