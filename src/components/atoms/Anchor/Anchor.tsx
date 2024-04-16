/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  size-small, size-large,
  variant-list-item, variant-nav-item, variant-outlined,
  variant-filled, variant-basic, variant-color,
  spacing-less, spacing-extra,
]}] */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { clsx } from "clsx";
import { forwardRef } from "react";

import type {
  COMPONENT_SIZES,
  COMPONENT_SPACINGS,
} from "../../../tools/constants/props.js";

import { getDynamicClassName } from "../../../tools/utils.js";
import { IconSpan } from "../../../wrappers/span.js";
import * as styles from "./anchor.module.css";

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
      as = "a",
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
    /* jscpd:ignore-start */
    const Element = as;
    return (
      <Element
        className={clsx(
          styles.anchor,
          {
            [styles.noVisited]: noVisited,
          },
          size && getDynamicClassName(styles, `size-${size}`),
          variant && getDynamicClassName(styles, `variant-${variant}`),
          spacing && getDynamicClassName(styles, `spacing-${spacing}`),
          className,
        )}
        ref={ref}
        {...props}
        /* jscpd:ignore-end */
      >
        {!!iconBefore && <IconSpan>{iconBefore}</IconSpan>}
        {children}
        {!!iconAfter && (
          <IconSpan className={styles.iconAfter}>{iconAfter}</IconSpan>
        )}
      </Element>
    );
  },
);
Anchor.displayName = "Anchor";

export default Anchor;
