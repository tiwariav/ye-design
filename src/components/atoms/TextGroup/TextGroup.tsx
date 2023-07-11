import { clsx } from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import Spinner from "../Spinner/Spinner.js";
import TextGroupLoader from "./TextGroupLoader.js";
import styles from "./textGroup.module.css";

interface TextGroupProps extends ComponentPropsWithoutRef<"span"> {
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  isBusy?: boolean;
  isLoading?: boolean;
}

export default function TextGroup({
  children,
  className,
  iconAfter,
  iconBefore,
  isBusy,
  isLoading,
  style,
  ...props
}: TextGroupProps) {
  return (
    <span className={clsx(styles.container, className)} {...props}>
      {isLoading ? (
        <TextGroupLoader iconAfter={!!iconAfter} iconBefore={!!iconBefore} />
      ) : (
        <>
          {iconBefore && (
            <span className={clsx(styles.icon)}>{iconBefore}</span>
          )}
          {children}
          {iconAfter && (
            <span className={clsx(styles.icon, styles.isAfter)}>
              {iconAfter}
            </span>
          )}
        </>
      )}
      {isBusy && <Spinner />}
    </span>
  );
}
