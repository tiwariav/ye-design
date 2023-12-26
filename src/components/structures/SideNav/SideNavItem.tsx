import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import styles from "./sideNavItem.module.css";

export interface SideNavItemProps<TElement extends ElementType = "div"> {
  as?: TElement;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  innerClassNames?: {
    icon?: string;
    text?: string;
  };
}

export default function SideNavItem<TElement extends ElementType>({
  as,
  children,
  className,
  icon,
  innerClassNames = {},
  ...props
}: SideNavItemProps<TElement> & ComponentPropsWithoutRef<TElement>) {
  const layoutState = LayoutContext.useContextState();
  const Element = as ?? "div";

  return (
    <Element
      className={clsx(styles.root, className, {
        [styles.hasCompact]: layoutState.sideNav.hasCompactMode,
        [styles.isToggled]:
          layoutState.sideNav.isToggled && layoutState.sideNav.hasCompactMode,
      })}
      {...props}
    >
      {icon && (
        <span className={clsx(styles.icon, innerClassNames?.icon)}>{icon}</span>
      )}
      {children && (
        <span className={clsx(styles.text, innerClassNames?.text)}>
          {children}
        </span>
      )}
    </Element>
  );
}
