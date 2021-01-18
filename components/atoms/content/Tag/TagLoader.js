import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./tag.module.css";

export default function TagLoader({
  iconAfter,
  iconBefore,
  className,
  ...props
}) {
  return (
    <span className={clsx(styles.loader, className)} {...props}>
      {iconBefore ? (
        <ContentLoader className={styles.loaderIcon} viewBox="0 0 24 24">
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      ) : null}

      <ContentLoader
        className={styles.loaderText}
        viewBox="0 0 100 24"
        preserveAspectRatio="xMaxYMid slice"
      >
        {/* Only SVG shapes */}
        <rect x="0" y="2" width="100%" height="20" />
      </ContentLoader>

      {iconAfter ? (
        <ContentLoader className={styles.loaderIcon} viewBox="0 0 24 24">
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      ) : null}
    </span>
  );
}

TagLoader.propTypes = {
  iconAfter: PropTypes.bool,
  iconBefore: PropTypes.bool,
};
