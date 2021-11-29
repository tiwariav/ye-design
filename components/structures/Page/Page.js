import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
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
}) {
  const topNavRef = React.useRef(null);
  const [spacerRef, spacerInView] = useInView();

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

  const clonedTopNav = useMemo(() => {
    if (topNav) {
      const topNavExpanded = topNavIsFixed && spacerInView;
      const extraProps = {
        withSideNav: Boolean(sideNav),
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
  }, [sideNav, topNav, topNavIsFixed, spacerInView, loading]);

  return (
    <div className={clsx(styles.root)}>
      {topNav ? (
        <div
          ref={topNavRef}
          className={clsx({
            [styles.isFixed]: topNavIsFixed,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.sideNavTop]: sideNavOnTop,
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
              })}
            >
              {sideNav}
            </div>
          ) : null}
          <div className={styles.content}>{children}</div>
        </div>
      </main>
    </div>
  );
}

export default Page;
