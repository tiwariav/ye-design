/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-basic', 'is-horizontal', 'is-borderless', 'view-thumb',
  'floating-highest', 'floating-high', 'floating-medium', 'floating-low', 'floating-lowest', 'floating-none',
  'height-full'
]}] */

import { clsx } from "clsx";
import {
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";

import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./card.module.css";

const CARD_FLOAT_OPTIONS = ["highest", "high", "medium", "low", "lowest"];
const CARD_LAYOUT_OPTIONS = ["horizontal", "vertical"];
const CARD_VARIANT_OPTIONS = ["basic", "borderless"];
const CARD_VIEW_MODE_OPTIONS = ["full", "thumb"];
const CARD_HEIGHT_OPTIONS = ["full"];

export interface CardProps extends ComponentPropsWithRef<"div"> {
  Element?: ElementType;
  floating?: (typeof CARD_FLOAT_OPTIONS)[number];
  flying?: (typeof CARD_FLOAT_OPTIONS)[number];
  height?: (typeof CARD_HEIGHT_OPTIONS)[number];
  image?: ReactNode;
  innerClassNames?: {
    content?: string;
  };
  isBusy?: boolean;
  layout?: (typeof CARD_LAYOUT_OPTIONS)[number];
  variant?: (typeof CARD_VARIANT_OPTIONS)[number];
  viewMode?: (typeof CARD_VIEW_MODE_OPTIONS)[number];
}

function Card(
  {
    Element = "div",
    children,
    className,
    floating,
    flying,
    height,
    image,
    innerClassNames = {},
    isBusy,
    layout = "vertical",
    variant = "basic",
    viewMode = "full",
    ...props
  }: CardProps,
  ref: CardProps["ref"],
) {
  return (
    <Element
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
}

export default forwardRef(Card);
