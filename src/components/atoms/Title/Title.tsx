/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-tinyline, is-tinyline-left,
  align-center
]}] */

import type { ComponentPropsWithoutRef, ElementType } from "react";

import { clsx } from "clsx";

import { getDynamicClassName } from "../../../tools/utils.js";
import * as styles from "./title.module.css";

const TITLE_ALIGN_OPTIONS = ["center"] as const;
const TITLE_VARIANT_OPTIONS = ["tinyline", "tinyline-left"] as const;

interface TitleProps extends ComponentPropsWithoutRef<"div"> {
  align?: (typeof TITLE_ALIGN_OPTIONS)[number];
  as?: ElementType;
  variant?: (typeof TITLE_VARIANT_OPTIONS)[number];
}
export default function Title({
  align,
  as = "div",
  className,
  variant,
  ...props
}: TitleProps) {
  const Element = as;
  return (
    <Element
      className={clsx(
        styles.root,
        align && getDynamicClassName(styles, `align-${align}`),
        variant && getDynamicClassName(styles, `is-${variant}`),
        className,
      )}
      {...props}
    />
  );
}
