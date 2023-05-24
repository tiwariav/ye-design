import { clsx } from "clsx";
import styles from "./title.module.css";

interface TitleProps {
  className?: string;
  align?: "center" | "left" | "right";
  variant?: "basic" | "tinyline" | "tyline-left";
  as?: any;
}
export default function Title({
  className,
  align,
  variant,
  as,
  ...props
}: TitleProps) {
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
