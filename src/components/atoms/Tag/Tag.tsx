import { clsx } from "clsx";

import Spinner from "../Spinner/Spinner.js";
import TagLoader from "./TagLoader.js";
import styles from "./tag.module.css";

function Tag({
  children,
  className,
  iconAfter,
  iconBefore,
  isBusy,
  loading,
  style,
  ...props
}: any) {
  return (
    <span className={clsx(styles.container, className)} {...props}>
      {loading ? (
        <TagLoader iconAfter={!!iconAfter} iconBefore={!!iconBefore} />
      ) : (
        <>
          {iconBefore ? (
            <span className={clsx(styles.icon)}>{iconBefore}</span>
          ) : null}
          {children}
          {iconAfter ? (
            <span className={clsx(styles.icon, styles.isAfter)}>
              {iconAfter}
            </span>
          ) : null}
        </>
      )}
      {isBusy ? <Spinner /> : null}
    </span>
  );
}

export default Tag;
