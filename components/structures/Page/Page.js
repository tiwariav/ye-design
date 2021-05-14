import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { range } from "../../../lib/array";
import styles from "./page.module.css";

function Page({
  children,
  hero,
  sidenav,
  sidenavIsSticky,
  topnav,
  topnavIsFixed,
  topnavShrinkOffset,
}) {
  const heroRef = React.useRef(null);
  const topnavRef = React.useRef(null);
  const topnavExpandedHeight = React.useRef(null);
  const [heroVisible, setHeroVisible] = React.useState(Boolean(hero));
  const [topnavShrink, setTopnavShrink] = React.useState(hero ? 0 : -1);

  React.useEffect(() => {
    setHeroVisible(Boolean(hero));
    setTopnavShrink(hero ? 0 : -1);
  }, [hero, setHeroVisible, setTopnavShrink]);

  React.useEffect(() => {
    if (heroRef.current && topnavRef.current) {
      if (!topnavExpandedHeight.current) {
        topnavExpandedHeight.current = topnavRef.current.offsetHeight;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          setHeroVisible(
            entry.isIntersecting && entry.intersectionRect.height > 0
          );
          setTopnavShrink(
            Math.max(
              topnavExpandedHeight.current - 67 - entry.intersectionRect.height,
              0
            )
          );
        },
        {
          root: document,
          rootMargin: `-${
            topnavShrinkOffset ||
            Math.min(window.innerHeight, heroRef.current.offsetHeight) -
              topnavExpandedHeight.current
          }px 0px 0px`,
          threshold: range(0, 0.25, 0.001),
        }
      );
      observer.observe(heroRef.current);
    }
  }, [heroRef, topnavShrinkOffset]);

  const clonedTopnav = useMemo(() => {
    return React.cloneElement(topnav, {
      variant: heroVisible ? "transparent" : undefined,
      isExpanded: topnavShrink >= 0,
      isShrinking: topnavShrink,
      withSidenav: Boolean(sidenav),
    });
  }, [topnavShrink, heroVisible, sidenav, topnav]);

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
          <div ref={heroRef} className={styles.hero}>
            {hero}
          </div>
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

Page.propTypes = {
  topnavIsFixed: PropTypes.bool,
  sidenavIsSticky: PropTypes.bool,
};

export default Page;
