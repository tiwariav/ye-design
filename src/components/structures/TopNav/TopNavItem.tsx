import { clsx } from "clsx";
import styles from "./topNav.module.css";

export default function TopNavItem({ children, hasSeparator, ...props }: any) {
  return (
    <div
      className={clsx(styles.topNavItem, {
        [styles.hasSeparator]: hasSeparator,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
