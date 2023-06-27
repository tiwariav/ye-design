import { clsx } from "clsx";

import ContentLoader from "../../../vendors/ContentLoader.js";
import styles from "./textGroupLoader.module.css";

const TEST_UNIQUE_KEY = process.env.JEST_WORKER_ID ? "test" : undefined;

export default function TextLoader({
  className,
  iconAfter,
  iconBefore,
  ...props
}: any) {
  return (
    <span className={clsx(styles.loader, className)} {...props}>
      {iconBefore && (
        <ContentLoader
          className={styles.loaderIcon}
          uniqueKey={TEST_UNIQUE_KEY}
          viewBox="0 0 24 24"
        >
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      )}

      <ContentLoader
        className={styles.loaderText}
        preserveAspectRatio="xMaxYMid slice"
        uniqueKey={TEST_UNIQUE_KEY}
        viewBox="0 0 100 24"
      >
        {/* Only SVG shapes */}
        <rect height="20" width="100%" x="0" y="2" />
      </ContentLoader>

      {iconAfter && (
        <ContentLoader
          className={styles.loaderIcon}
          uniqueKey={TEST_UNIQUE_KEY}
          viewBox="0 0 24 24"
        >
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      )}
    </span>
  );
}
