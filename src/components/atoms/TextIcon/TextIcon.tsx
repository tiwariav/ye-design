import { ComponentPropsWithoutRef } from "react";

import styles from "./textIcon.module.css";

export default function Text({
  children,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span className={styles.container} {...props}>
      {children}
    </span>
  );
}
