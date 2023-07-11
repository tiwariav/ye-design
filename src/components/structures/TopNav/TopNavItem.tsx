import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";

import styles from "./topNavItem.module.css";

interface TopNavItemProps extends ComponentPropsWithoutRef<"div"> {
  hasSeparator?: boolean;
}

export default function TopNavItem({
  children,
  hasSeparator,
  ...props
}: TopNavItemProps) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.hasSeparator]: hasSeparator,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
