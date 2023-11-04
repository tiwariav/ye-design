import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";

import styles from "./topNavItem.module.css";

export interface TopNavItemProps extends ComponentPropsWithoutRef<"div"> {
  hasSeparator?: boolean;
}

export default function TopNavItem({
  children,
  className,
  hasSeparator,
  ...props
}: TopNavItemProps) {
  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.hasSeparator]: hasSeparator,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
