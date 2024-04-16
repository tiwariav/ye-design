/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-basic', 'is-circular'] }] */

import type { ComponentPropsWithoutRef, ElementType } from "react";

import { clsx } from "clsx";
import { useEffect, useMemo, useState } from "react";

import { getDynamicClassName } from "../../../tools/utils.js";
import Spinner from "../Spinner/Spinner.js";
import ImageLoader from "./ImageLoader.js";
import * as styles from "./image.module.css";

const IMAGE_VARIANT_OPTIONS = ["basic", "circular"] as const;
const MAX_PERCENT = 100;

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {
  as?: ElementType;
  aspectRatio?: `${number}/${number}`;
  isBusy?: boolean;
  isLoading?: boolean;
  variant?: (typeof IMAGE_VARIANT_OPTIONS)[number];
}

export default function Image({
  as = "img",
  aspectRatio,
  className,
  isBusy,
  isLoading,
  style,
  variant = "basic",
  ...props
}: ImageProps) {
  const [contentStyle, setContentStyle] = useState({});

  const image = useMemo(() => {
    const Element = as;
    return <Element className={clsx(styles.image, className)} {...props} />;
  }, [as, className, props]);

  useEffect(() => {
    if (aspectRatio ?? variant === "circular") {
      let ratio = [1, 1];
      if (aspectRatio && variant !== "circular") {
        ratio = aspectRatio.split("/").map((item) => Number.parseInt(item));
      }
      setContentStyle({
        paddingBottom: `${(MAX_PERCENT * ratio[1]) / ratio[0]}%`,
      });
    }
  }, [aspectRatio, variant]);

  return (
    <div
      className={clsx(
        styles.container,
        getDynamicClassName(styles, `is-${variant}`),
      )}
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
