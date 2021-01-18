import clsx from "clsx";
import React from "react";
import styles from "./sidenav.module.css";

export default function Sidenav({ children, withHanging, ...props }) {
  return (
    <div
      className={clsx(styles.sidenav, { [styles.withHanging]: withHanging })}
      {...props}
    >
      {children}
    </div>
  );
}
