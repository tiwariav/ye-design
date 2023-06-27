/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-small'] }] */

import { clsx } from "clsx";
import { uniqueId } from "lodash-es";
import { forwardRef, useMemo } from "react";

import { SVGPathFlag, SVGPathPin } from "../../../svg/paths/index.js";
import { VARIANT_OPTIONS } from "./options.js";
import styles from "./symbol.module.css";

function imageTransform(variant) {
  switch (variant) {
    case VARIANT_OPTIONS.pin: {
      return "translate(0 -0.5)";
    }
    case VARIANT_OPTIONS.flag: {
      return "translate(0 -0.75)";
    }
    default: {
      return "translate(0 0)";
    }
  }
}

const Symbol = forwardRef(
  ({ className, fill, imageProps, imageSrc, variant, ...props }: any, ref) => {
    const maskID = useMemo(() => uniqueId("svgMask_"), []);

    return (
      <svg
        className={clsx(styles.root, className)}
        ref={ref}
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <mask id={maskID}>
          <rect fill="black" height="100%" width="100%" />
          {variant === VARIANT_OPTIONS.circle ? (
            <circle cx="5" cy="5" fill="white" r="5" />
          ) : variant === VARIANT_OPTIONS.triangle ? (
            <circle cx="5" cy="5" fill="white" r="5" />
          ) : variant === VARIANT_OPTIONS.pin ? (
            <SVGPathPin fill="white" transform="translate(.95 0)" />
          ) : variant === VARIANT_OPTIONS.flag ? (
            <SVGPathFlag fill="white" transform="translate(.3 0)" />
          ) : (
            <rect fill="white" height="100%" width="100%" />
          )}
        </mask>
        <rect fill={fill} height="100%" mask={`url(#${maskID})`} width="100%" />
        {imageSrc && (
          <image
            height="100%"
            href={imageSrc}
            transform={imageTransform(variant)}
            width="100%"
            {...imageProps}
          />
        )}
      </svg>
    );
  }
);

export default Symbol;
