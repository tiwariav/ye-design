import { clsx } from "clsx";

import Spinner from "../Spinner/Spinner.js";
import TextGroupLoader from "./TextGroupLoader.js";
import styles from "./textGroup.module.css";

function TextGroup({
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
export default TextGroup;
