/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-basic', 'is-horizontal', 'is-borderless', 'view-thumb',
  'floating-highest', 'floating-high', 'floating-medium', 'floating-low', 'floating-lowest', 'floating-none',
  'height-full'
]}] */

import { clsx } from "clsx";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./card.module.css";

const floatOptions = ["highest", "high", "medium", "low", "lowest"] as const;
const layoutOptions = ["horizontal", "vertical"] as const;
const variantOptions = ["basic", "borderless"] as const;
const viewModeOptions = ["full", "thumb"] as const;
const heightOptions = ["full"] as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: any;
  busy?: boolean;
  children: ReactNode;
  className?: string;
  floating?: (typeof floatOptions)[number];
  flying?: (typeof floatOptions)[number];
  height?: (typeof heightOptions)[number];
  image?: any;
  innerClassNames?: {
    content?: string;
  };
  layout?: (typeof layoutOptions)[number];
  variant?: (typeof variantOptions)[number];
  viewMode?: (typeof viewModeOptions)[number];
}

const Card = forwardRef(
  (
    {
      as,
      busy,
      children,
      className,
      floating,
      flying,
      height,
      image,
      innerClassNames = {},
      layout = "vertical",
      variant = "basic",
      viewMode = "full",
      ...props
    }: CardProps,
    ref
  ) => {
    const As = as || "div";
    return (
      <As
        className={clsx(
          styles.card,
          styles[`is-${variant}`],
          styles[`is-${layout}`],
          styles[`view-${viewMode}`],
          {
            [styles[`floating-${floating}`]]: floating,
            [styles[`flying-${flying}`]]: flying,
            [styles[`height-${height}`]]: height,
          },
          className
        )}
        {...props}
      >
        {image && <div className={styles.image}>{image}</div>}
        {children && (
          <div className={clsx([styles.content], innerClassNames.content)}>
            {children}
          </div>
        )}
        {busy && <Spinner />}
      </As>
    );
  }
);

export default Card;
