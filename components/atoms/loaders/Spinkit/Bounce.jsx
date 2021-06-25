import clsx from "clsx";
import React from "react";
import styles from "./bounce.module.css";

export default function Bounce() {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.bounce, styles.bounce1)}></div>
      <div className={clsx(styles.bounce, styles.bounce2)}></div>
      <div className={clsx(styles.bounce, styles.bounce3)}></div>
    </div>
  );
}
