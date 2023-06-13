/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-tinyline, is-tinyline-left,
  align-center
]}] */

import { clsx } from "clsx";

import styles from "./title.module.css";

interface TitleProps {
  align?: "center" | "left" | "right";
  as?: any;
  className?: string;
  variant?: "basic" | "tinyline" | "tyline-left";
}
export default function Title({
  align,
  as,
  className,
  variant,
  ...props
}: TitleProps) {
  const As = as || "div";
  return (
    <As
      className={clsx(
        styles.root,
        {
          [styles[`align-${align}`]]: align,
          [styles[`is-${variant}`]]: variant,
        },
        className
      )}
      {...props}
    />
  );
}
