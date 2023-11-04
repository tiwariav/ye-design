import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import styles from "./sideNavItem.module.css";

export interface SideNavItemProps<TElement extends ElementType = "div"> {
  as?: TElement;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function SideNavItem<TElement extends ElementType = "div">({
  as,
  children,
  className,
  icon,
  ...props
}: SideNavItemProps<TElement> & ComponentPropsWithoutRef<TElement>) {
  const layoutState = LayoutContext.useContextState();
  const Element = as || "div";
  return (
    <Element
      className={clsx(styles.root, className, {
        [styles.isToggled]: layoutState.sideNav.isToggled,
      })}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </Element>
  );
}
