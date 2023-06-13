import { clsx } from "clsx";

import styles from "./sideNav.module.css";

export default function SideNav({ children, withHanging, ...props }: any) {
  return (
    <div
      className={clsx(styles.root, { [styles.withHanging]: withHanging })}
      {...props}
    >
      {children}
    </div>
  );
}
