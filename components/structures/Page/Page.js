import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { range } from "../../../lib/array";
import styles from "./page.module.css";

function Page({
  topnav,
  topnavIsFixed,
  sidenav,
  sidenavIsSticky,
  hero,
  children,
}) {
  const heroRef = React.useRef(null);
  const [heroVisible, setHeroVisible] = React.useState(Boolean(hero));
  const [topnavShrink, setTopnavShrink] = React.useState(hero ? 0 : -1);

  React.useEffect(() => {
    setHeroVisible(Boolean(hero));
    setTopnavShrink(hero ? 0 : -1);
  }, [hero, setHeroVisible, setTopnavShrink]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(
          entry.isIntersecting && entry.intersectionRect.height > 0
        );
        setTopnavShrink(Math.max(72 - entry.intersectionRect.height, 0));
      },
      {
        root: document,
        rootMargin: "-72px 0px 0px",
        threshold: range(0, 0.25, 0.001),
      }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
  }, [heroRef]);

  return (
    <div className={styles.page}>
      {topnav ? (
        <div
          className={clsx(styles.topnav, { [styles.isFixed]: topnavIsFixed })}
        >
          {React.cloneElement(topnav, {
            isTransparent: heroVisible,
            isExpanded: topnavShrink >= 0,
            isShrinking: topnavShrink,
            withSidenav: Boolean(sidenav),
          })}
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
