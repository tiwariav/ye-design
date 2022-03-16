import clsx from "clsx";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import styles from "./textGroup.module.css";
import TextGroupLoader from "./TextGroupLoader";

function TextGroup({
  children,
  iconBefore,
  iconAfter,
  loading,
  isBusy,
  style,
  className,
  ...props
}) {
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

TextGroup.propTypes = {
  loading: PropTypes.bool,
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};

export default TextGroup;
