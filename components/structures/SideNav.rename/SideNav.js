import clsx from "clsx";
import React from "react";
import styles from "./sideNav.module.css";

export default function SideNav({ children, withHanging, ...props }) {
  return (
    <div
      className={clsx(styles.root, { [styles.withHanging]: withHanging })}
      {...props}
    >
      {children}
    </div>
  );
}
