import { clsx } from "clsx";
import ContentLoader from "react-content-loader";
import styles from "./textGroupLoader.module.css";

const TEST_UNIQUE_KEY = process.env.JEST_WORKER_ID ? "test" : undefined;

export default function TextLoader({
  iconAfter,
  iconBefore,
  className,
  ...props
}: any) {
  return (
    <span className={clsx(styles.loader, className)} {...props}>
      {iconBefore ? (
        <ContentLoader
          uniqueKey={TEST_UNIQUE_KEY}
          className={styles.loaderIcon}
          viewBox="0 0 24 24"
        >
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      ) : null}

      <ContentLoader
        uniqueKey={TEST_UNIQUE_KEY}
        className={styles.loaderText}
        viewBox="0 0 100 24"
        preserveAspectRatio="xMaxYMid slice"
      >
        {/* Only SVG shapes */}
        <rect x="0" y="2" width="100%" height="20" />
      </ContentLoader>

      {iconAfter ? (
        <ContentLoader
          uniqueKey={TEST_UNIQUE_KEY}
          className={styles.loaderIcon}
          viewBox="0 0 24 24"
        >
          {/* Only SVG shapes */}
          <circle cx="12" cy="12" r="12" />
        </ContentLoader>
      ) : null}
    </span>
  );
}
