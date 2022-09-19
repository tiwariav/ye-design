import { clsx } from "clsx";
import styles from "./title.module.css";

export default function Title({
  className,
  align,
  variant,
  as,
  ...props
}: any) {
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
