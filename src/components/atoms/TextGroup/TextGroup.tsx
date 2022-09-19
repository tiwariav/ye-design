import { clsx } from "clsx";
import Spinner from "../Spinner/Spinner.js";
import styles from "./textGroup.module.css";
import TextGroupLoader from "./TextGroupLoader.js";

function TextGroup({
  children,
  iconBefore,
  iconAfter,
  loading,
  isBusy,
  style,
  className,
  ...props
}: any) {
  return (
    <span className={clsx(styles.container, className)} {...props}>
      {loading ? (
        <TextGroupLoader iconAfter={!!iconAfter} iconBefore={!!iconBefore} />
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
export default TextGroup;
