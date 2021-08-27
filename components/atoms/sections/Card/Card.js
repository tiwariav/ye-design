/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-basic', 'is-horizontal', 'is-borderless', 'view-thumb',
  'floating-highest', 'floating-high', 'floating-medium', 'floating-low', 'floating-lowest', 'floating-none',
  'height-full'
]}] */


import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../../content/Spinner/Spinner";
import styles from "./card.module.css";

export default function Card({
  variant,
  layout,
  image,
  viewMode,
  busy,
  children,
  className,
  floating,
  height,
  disabled,
  onClick,
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`is-${variant}`],
        styles[`is-${layout}`],
        styles[`view-${viewMode}`],
        { [styles[`floating-${floating}`]]: floating },
        { [styles[`height-${height}`]]: height },
        { [styles.disabled]: disabled },
        className
      )}
      onClick={() => disabled ? null : onClick()}
      {...props}
    >
      {image ? <div className={styles.image}>{image}</div> : null}
      {children ? <div className={styles.content}>{children}</div> : null}
      {busy ? <Spinner /> : null}
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
