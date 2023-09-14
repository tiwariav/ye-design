/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  size-small, size-large,
  variant-list-item, variant-nav-item, variant-outlined,
  variant-filled, variant-basic, variant-color,
  spacing-less, spacing-extra,
]}] */

import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";

import {
  COMPONENT_SIZES,
  COMPONENT_SPACINGS,
} from "../../../tools/constants/props.js";
import { IconSpan } from "../../../wrappers/span.js";
import styles from "./anchor.module.css";

export const ANCHOR_VARIANTS = [
  "color",
  "filled",
  "list-item",
  "nav-item",
  "outlined",
] as const;

export interface AnchorProps extends ComponentPropsWithoutRef<"a"> {
  as?: ElementType;
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  noVisited?: boolean;
  size?: (typeof COMPONENT_SIZES)[number];
  spacing?: (typeof COMPONENT_SPACINGS)[number];
  variant?: (typeof ANCHOR_VARIANTS)[number];
}

/**
 * Primary UI component for user interaction
 */
const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      as,
      children,
      className,
      iconAfter,
      iconBefore,
      noVisited,
      size,
      spacing,
      variant,
      ...props
    },
    ref,
  ) => {
    console.log(as, children, props);
    const Element = as || "a";
    return (
      <Element
        className={clsx(
          styles.anchor,
          {
            [styles.noVisited]: noVisited,
          },
          size && styles[`size-${size}`],
          variant && styles[`variant-${variant}`],
          spacing && styles[`spacing-${spacing}`],
          className,
        )}
        ref={ref}
        {...props}
      >
        {iconBefore && <IconSpan>{iconBefore}</IconSpan>}
        {children}
        {iconAfter && (
          <IconSpan className={styles.iconAfter}>{iconAfter}</IconSpan>
        )}
      </Element>
    );
  },
);

export default Anchor;
