import { clsx } from "clsx";
import { isObject } from "lodash-es";
import React, { ReactElement, ReactNode, useMemo } from "react";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import { SideNavProps, SideNavToggle } from "../SideNav/SideNav.js";
import { TopNavProps } from "../TopNav/TopNav.js";
import styles from "./page.module.css";

const variantTSC = "[T][SC]";
const variantSTC = "[S][TC]";
const variantOptions = [variantTSC, variantSTC] as const;

interface PageProps {
  children?: ReactNode;
  hero?: ReactNode;
  innerClassNames?: {
    container?: string;
    content?: string;
    hero?: string;
  };
  isCentered?: boolean;
  sideNav?: ReactElement;
  topNav?: ReactElement;
  variant?: (typeof variantOptions)[number];
}

function PageInner({
  children,
  hero,
  innerClassNames = {},
  isCentered,
  sideNav,
  topNav,
  variant = variantTSC,
}: PageProps) {
  const topNavMemo = useMemo(() => {
    if (!topNav) return null;
    const topNavProps = ({ ...topNav?.props } || {}) as TopNavProps;
    if (sideNav && topNavProps.sticky) {
      topNavProps.sideNavIcon = <SideNavToggle />;
    }
    return React.cloneElement(topNav, topNavProps);
  }, [topNav, sideNav]);

  const sideNavMemo = useMemo(() => {
    if (!sideNav) return null;
    const topNavProps = (topNav?.props || {}) as TopNavProps;
    const sideNavProps = { ...sideNav?.props } as SideNavProps;
    if (
      variant === variantTSC &&
      sideNavProps.sticky &&
      topNavProps.sticky &&
      (!isObject(topNavProps.sticky) ||
        !topNavProps.sticky.hideOnScroll ||
        topNavProps.variant !== "transparent")
    ) {
      if (sideNavProps.sticky === true) {
        sideNavProps.sticky = { topNavOffset: true };
      } else {
        sideNavProps.sticky.topNavOffset = true;
      }
    }
    return React.cloneElement(sideNav, sideNavProps);
  }, [sideNav, topNav?.props, variant]);

  return (
    <div
      className={clsx(styles.root, {
        [styles.variantStc]: variant === variantSTC,
      })}
    >
      {variant === variantTSC ? topNavMemo : sideNavMemo}
      <main
        className={clsx(styles.main, {
          [styles.isCentered]: isCentered,
        })}
      >
        {variant === variantSTC && topNavMemo}
        {hero}
        <div className={clsx(styles.container, innerClassNames.container)}>
          {variant === variantTSC && sideNavMemo}
          <div className={clsx(styles.content, innerClassNames.content)}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

const Page = ({ ...props }: PageProps) => (
  <LayoutContext.LayoutProvider>
    <PageInner {...props} />
  </LayoutContext.LayoutProvider>
);

export default Page;
