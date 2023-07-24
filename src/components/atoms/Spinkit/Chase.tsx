import { ComponentPropsWithoutRef } from "react";

import styles from "./chase.module.css";

export default function Chase(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={styles.root} {...props}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}
