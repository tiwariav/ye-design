import { clsx } from "clsx";
import { ReactNode } from "react";

import SideNavItem, { SideNavItemProps } from "./SideNavItem.js";
import styles from "./sideNavGroup.module.css";

export const SideNavTitle = (props: SideNavItemProps) => (
  <SideNavItem className={clsx(styles.title)} {...props} />
);

interface SideNavGroupProps {
  children: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
}
export default function SideNavGroup({
  children,
  icon,
  title,
  ...props
}: SideNavGroupProps) {
  return (
    <div className={clsx(styles.root)} {...props}>
      {title && <SideNavTitle icon={icon}>{title}</SideNavTitle>}
      {children}
    </div>
  );
}
