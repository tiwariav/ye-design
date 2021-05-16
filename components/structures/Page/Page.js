import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./page.module.css";

function Page({
  children,
  hero,
  sidenav,
  sidenavIsSticky,
  topnav,
  topnavIsFixed,
  topnavShrinkOffset = 0,
}) {
  const topnavRef = React.useRef(null);
  const [spacerRef, spacerInView] = useInView();

  const [topnavMaxHeight, setTopnavMaxHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const scopeTopnavMaxHeight = topnavRef.current.offsetHeight;
    if (!topnavMaxHeight) {
      setTopnavMaxHeight(scopeTopnavMaxHeight);
      setLoading(false);
    }
  }, [topnavMaxHeight]);

  const clonedTopnav = useMemo(() => {
    const topnavExpanded = topnavIsFixed && spacerInView;
    return React.cloneElement(topnav, {
      variant: topnavExpanded || loading ? "transparent" : undefined,
      isExpanded: topnavExpanded,
      withSidenav: Boolean(sidenav),
    });
  }, [sidenav, topnav, topnavIsFixed, spacerInView, loading]);

  return (
    <div className={styles.page}>
      {topnav ? (
        <div
          ref={topnavRef}
          className={clsx(styles.topnav, { [styles.isFixed]: topnavIsFixed })}
        >
          {clonedTopnav}
        </div>
      ) : null}
      <main className={styles.main}>
        {hero ? (
          <>
            <div
              ref={spacerRef}
              className={styles.spacer}
              style={{ top: topnavMaxHeight + topnavShrinkOffset }}
            />
            <div className={styles.hero}>{hero}</div>
          </>
        ) : null}
        <div className={styles.container}>
          {sidenav ? (
            <div
              className={clsx(styles.sidenav, {
                [styles.isSticky]: sidenavIsSticky,
              })}
              style={
                sidenavIsSticky && topnavIsFixed
                  ? { top: "4.5rem", height: "calc(100vh - 4.5rem)" }
                  : undefined
              }
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
