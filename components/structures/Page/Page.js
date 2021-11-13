import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./page.module.css";

function Page({
  children,
  hero,
  isCentered,
  sidenav,
  sidenavIsSticky,
  sidenavOnTop,
  topnav,
  topnavIsFixed,
  topnavCanExpand,
  topnavShrinkOffset = 0,
}) {
  const topnavRef = React.useRef(null);
  const [spacerRef, spacerInView] = useInView();

  const [topnavMaxHeight, setTopnavMaxHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (topnavRef.current) {
      const scopeTopnavMaxHeight = topnavRef.current.offsetHeight;
      if (!topnavMaxHeight) {
        setTopnavMaxHeight(scopeTopnavMaxHeight);
        setLoading(false);
      }
    }
  }, [topnavMaxHeight]);

  const clonedTopnav = useMemo(() => {
    if (topnav) {
      const topnavExpanded = topnavIsFixed && spacerInView;
      const extraProps = {
        withSidenav: Boolean(sidenav),
      };
      if (topnavExpanded) {
        extraProps.isExpanded = true;
      }
      if (topnavExpanded || loading) {
        extraProps.variant = "transparent";
      }
      return React.cloneElement(topnav, extraProps);
    }
    return null;
  }, [sidenav, topnav, topnavIsFixed, spacerInView, loading]);

  return (
    <div className={clsx(styles.root)}>
      {topnav ? (
        <div
          ref={topnavRef}
          className={clsx({
            [styles.isFixed]: topnavIsFixed,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.sidenavTop]: sidenavOnTop,
          })}
        >
          {clonedTopnav}
        </div>
      ) : null}
      <main
        className={clsx(styles.main, {
          [styles.withTopnavFixed]: topnavIsFixed,
          [styles.isCentered]: isCentered,
        })}
      >
        {topnavCanExpand ? (
          <div
            ref={spacerRef}
            className={styles.spacer}
            style={{ top: topnavMaxHeight + topnavShrinkOffset }}
          />
        ) : null}
        {hero ? <div>{hero}</div> : null}
        <div className={styles.container}>
          {sidenav ? (
            <div
              className={clsx(styles.sidenav, {
                [styles.isSticky]: sidenavIsSticky,
                // eslint-disable-next-line css-modules/no-undef-class
                [styles.topnavTop]: sidenavIsSticky && !sidenavOnTop,
              })}
            >
              {sidenav}
            </div>
          ) : null}
          <div className={styles.content}>{children}</div>
        </div>
      </main>
    </div>
  );
}

export default Page;
