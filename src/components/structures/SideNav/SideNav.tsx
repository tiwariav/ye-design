import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";

import styles from "./sideNav.module.css";

export interface SideNavProps extends ComponentPropsWithoutRef<"div"> {
  withHanging?: boolean;
}

export default function SideNav({
  children,
  withHanging,
  ...props
}: SideNavProps) {
  return (
    <div
      className={clsx(styles.root, { [styles.withHanging]: withHanging })}
      {...props}
    >
      {children}
    </div>
  );
}
