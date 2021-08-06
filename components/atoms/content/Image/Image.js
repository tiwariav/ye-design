/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-basic', 'is-circular'] }] */

import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./image.module.css";
import ImageLoader from "./ImageLoader";

const variants = ["basic", "circular"];

function Image({
  aspectRatio,
  variant,
  Element,
  loading,
  isBusy,
  style,
  className,
  ...props
}) {
  const [contentStyle, setContentStyle] = useState({});

  const image = useMemo(
    () => <Element className={clsx(styles.image, className)} {...props} />,
    [className, props]
  );

  useEffect(() => {
    if (aspectRatio || variant === "circular") {
      const ratio =
        variant === "circular"
          ? [1, 1]
          : aspectRatio.split("/").map((item) => Number.parseInt(item));
      setContentStyle({ paddingBottom: (100 * ratio[1]) / ratio[0] + "%" });
    }
  }, [aspectRatio, variant]);

  return (
    <div
      className={clsx(styles.container, styles[`is-${variant}`])}
      style={style}
    >
      {loading ? (
        <ImageLoader className={styles.image} />
      ) : aspectRatio ? (
        <div className={styles.ratio} style={contentStyle}>
          {image}
        </div>
      ) : (
        image
      )}
      {isBusy ? <Spinner className={styles.spinner} /> : null}
    </div>
  );
}

Image.propTypes = {
  aspectRatio: function (props, propName, componentName) {
    /* An aspect ratio defined as `width`/`height`,
     * where both `width` and `height` are numbers.
     */
    if (props[propName] && !/\d+\/\d+/.test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
  },
  variant: PropTypes.oneOf(variants),
  loading: PropTypes.bool,
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};

Image.defaultProps = {
  variant: "basic",
  Element: "img",
  style: {},
};

export default Image;
