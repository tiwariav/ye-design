import { clsx } from "clsx";
import styles from "./sideNavFooter.module.css";

export default function SideNavFooter({
  children,
  hasSeparator,
  ...props
}: any) {
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
