import React from "react";
import styles from "./doubleBounce.module.css";

export default function DoubleBounce(props) {
  return (
    <div className={styles.root} {...props}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
    </div>
  );
}
