/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'space-none', 'space-small', 'space-large'
]}] */

import { clsx } from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

import styles from "./divider.module.css";

const DIVIDER_SPACING_OPTIONS = ["none", "small", "medium", "large"];

interface DividerProps extends ComponentPropsWithoutRef<"div"> {
  spacing?: (typeof DIVIDER_SPACING_OPTIONS)[number];
  vertical?: boolean;
}

export default function Divider({
  className,
  spacing = "medium",
  vertical,
  ...props
}: DividerProps) {
  return React.createElement(
    vertical ? "div" : "hr",
    {
      className: clsx(
        styles.root,
        { "is-vertical": vertical },
        styles[`space-${spacing}`],
        className,
      ),
      ...props,
    },
    null,
  );
}
