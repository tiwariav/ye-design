/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-basic', 'is-circular'] }] */

import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  ElementType,
  useEffect,
  useMemo,
  useState,
} from "react";

import Spinner from "../Spinner/Spinner.js";
import ImageLoader from "./ImageLoader.js";
import styles from "./image.module.css";

const IMAGE_VARIANT_OPTIONS = ["basic", "circular"] as const;

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {
  Element?: ElementType;
  aspectRatio?: `${number}/${number}`;
  isBusy?: boolean;
  isLoading?: boolean;
  variant?: (typeof IMAGE_VARIANT_OPTIONS)[number];
}

export default function Image({
  Element = "img",
  aspectRatio,
  className,
  isBusy,
  isLoading,
  style = {},
  variant = "basic",
  ...props
}: ImageProps) {
  const [contentStyle, setContentStyle] = useState({});
  const image = useMemo(
    () => <Element className={clsx(styles.image, className)} {...props} />,
    [Element, className, props],
  );

  useEffect(() => {
    if (aspectRatio || variant === "circular") {
      let ratio = [1, 1];
      if (aspectRatio && variant !== "circular") {
        ratio = aspectRatio.split("/").map((item) => Number.parseInt(item));
      }
      setContentStyle({ paddingBottom: `${(100 * ratio[1]) / ratio[0]}%` });
    }
  }, [aspectRatio, variant]);

  return (
    <div
      className={clsx(styles.container, styles[`is-${variant}`])}
      style={style}
    >
      {isLoading ? (
        <ImageLoader className={styles.image} />
      ) : aspectRatio ? (
        <div className={styles.ratio} style={contentStyle}>
          {image}
        </div>
      ) : (
        image
      )}
      {isBusy && <Spinner className={styles.spinner} />}
    </div>
  );
}
