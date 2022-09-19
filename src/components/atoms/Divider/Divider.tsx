/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'space-none', 'space-small', 'space-large'
]}] */

import { clsx } from "clsx";
import React from "react";
import styles from "./divider.module.css";

const spacingOptions = ["none", "small", "medium", "large"];
export default function Divider({
  className,
  spacing = "medium",
  vertical,
  ...props
}: any) {
  return React.createElement(
    vertical ? "div" : "hr",
    {
      className: clsx(
        styles.root,
        { "is-vertical": vertical },
        styles[`space-${spacing}`],
        className
      ),
      ...props,
    },
    null
  );
}
