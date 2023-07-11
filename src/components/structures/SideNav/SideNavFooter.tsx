import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";

import styles from "./sideNavFooter.module.css";

interface SideNavFooterProps extends ComponentPropsWithoutRef<"div"> {
  hasSeparator?: boolean;
}

export default function SideNavFooter({
  children,
  hasSeparator,
  ...props
}: SideNavFooterProps) {
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
