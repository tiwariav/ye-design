import clsx from "clsx";
import React from "react";
import styles from "./hero.module.css";

function Hero({ title, midContent, children }) {
  return (
    <div className={clsx(styles.hero)}>
      <div className={clsx(styles.content)}>
        {title ? <h1 className={clsx(styles.title)}>{title}</h1> : null}
        {midContent ? (
          <div className={styles.contentMid}>{midContent}</div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

Hero.propTypes = {};

export default Hero;
