import clsx from "clsx";
import React from "react";
import styles from "./title.module.css";

export default function Title({ className, align, variant, as, ...props }) {
  const As = as || "div";
  return (
    <As
      className={clsx(
        styles.root,
        {
          [styles[`is-${variant}`]]: variant,
          [styles[`align-${align}`]]: align,
        },
        className
      )}
      {...props}
    />
  );
}
