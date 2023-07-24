/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'variant-basic', 'layout-horizontal', 'variant-borderless', 'view-thumb',
  'floating-highest', 'floating-high', 'floating-medium', 'floating-low', 'floating-lowest', 'floating-none',
  'height-full'
]}] */

import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";

import { COMPONENT_FLOAT } from "../../../tools/constants/props.js";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./card.module.css";

export const CARD_LAYOUTS = ["horizontal"] as const;
export const CARD_VARIANTS = ["basic", "borderless"] as const;
export const CARD_VIEW_MODES = ["thumb"] as const;
export const CARD_HEIGHTS = ["full"] as const;
export const CARD_FLYING = ["medium"] as const;

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  floating?: (typeof COMPONENT_FLOAT)[number];
  flying?: (typeof CARD_FLYING)[number];
  height?: (typeof CARD_HEIGHTS)[number];
  image?: ReactNode;
  innerClassNames?: {
    content?: string;
  };
  isBusy?: boolean;
  layout?: (typeof CARD_LAYOUTS)[number];
  variant?: (typeof CARD_VARIANTS)[number];
  viewMode?: (typeof CARD_VIEW_MODES)[number];
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      as = "div",
      children,
      className,
      floating,
      flying,
      height,
      image,
      innerClassNames = {},
      isBusy,
      layout,
      variant = "basic",
      viewMode,
      ...props
    },
    ref,
  ) => {
    const Element = as;
    return (
      <Element
        className={clsx(
          styles.card,
          styles[`variant-${variant}`],
          // @ts-ignore: TS7057 because no styles for some variant yet
          layout && styles[`layout-${layout}`],
          viewMode && styles[`view-${viewMode}`],
          floating && styles[`floating-${floating}`],
          // @ts-ignore: TS7057 because no styles for some variant yet
          flying && styles[`flying-${flying}`],
          height && styles[`height-${height}`],
          className,
        )}
        ref={ref}
        {...props}
      >
        {image && <div className={styles.image}>{image}</div>}
        {children && (
          <div className={clsx([styles.content], innerClassNames.content)}>
            {children}
          </div>
        )}
        {isBusy && <Spinner />}
      </Element>
    );
  },
);

export default Card;
