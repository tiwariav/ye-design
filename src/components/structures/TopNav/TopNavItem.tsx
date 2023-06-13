import { clsx } from "clsx";

import styles from "./topNavItem.module.css";

export default function TopNavItem({ children, hasSeparator, ...props }: any) {
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
