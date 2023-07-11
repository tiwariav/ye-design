import { clsx } from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import Spinner from "../Spinner/Spinner.js";
import TagLoader from "./TagLoader.js";
import styles from "./tag.module.css";

interface TagProps extends ComponentPropsWithoutRef<"span"> {
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  isBusy?: boolean;
  isLoading?: boolean;
}

function Tag({
  children,
  className,
  iconAfter,
  iconBefore,
  isBusy,
  isLoading,
  style,
  ...props
}: TagProps) {
  return (
    <span className={clsx(styles.container, className)} {...props}>
      {isLoading ? (
        <TagLoader iconAfter={!!iconAfter} iconBefore={!!iconBefore} />
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

export default Tag;
