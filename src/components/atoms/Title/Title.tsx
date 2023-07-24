/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-tinyline, is-tinyline-left,
  align-center
]}] */

import { clsx } from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";

import styles from "./title.module.css";

const TITLE_ALIGN_OPTIONS = ["center"] as const;
const TITLE_VARIANT_OPTIONS = ["tinyline", "tinyline-left"] as const;

interface TitleProps extends ComponentPropsWithoutRef<"div"> {
  Element?: ElementType;
  align?: (typeof TITLE_ALIGN_OPTIONS)[number];
  variant?: (typeof TITLE_VARIANT_OPTIONS)[number];
}
export default function Title({
  Element = "div",
  align,
  className,
  variant,
  ...props
}: TitleProps) {
  return (
    <Element
      className={clsx(
        styles.root,
        align && [styles[`align-${align}`]],
        variant && [styles[`is-${variant}`]],
        className,
      )}
      {...props}
    />
  );
}
