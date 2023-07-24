import { ComponentPropsWithoutRef } from "react";

import styles from "./doubleBounce.module.css";

export default function DoubleBounce(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={styles.root} {...props}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
    </div>
  );
}
