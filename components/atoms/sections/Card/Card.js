import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../../content/Spinner/Spinner";
import styles from "./card.module.css";

function Card({
  variant,
  layout,
  image,
  viewMode,
  busy,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`is-${variant}`],
        styles[`is-${layout}`],
        styles[`view-${viewMode}`],
        className
      )}
      {...props}
    >
      {image ? <div className={styles.image}>{image}</div> : null}
      {children ? <div className={styles.content}>{children}</div> : null}
      {busy ? <Spinner className={styles.spinner} /> : null}
    </div>
  );
}

Card.propTypes = {
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  variant: PropTypes.oneOf(["basic", "borderless"]),
  viewMode: PropTypes.oneOf(["full", "mini", "thumb"]),
  /**
   * Wether the element is busy
   */
  busy: PropTypes.bool,
};

Card.defaultProps = {
  layout: "vertical",
  variant: "basic",
  viewMode: "full",
};

export default Card;
