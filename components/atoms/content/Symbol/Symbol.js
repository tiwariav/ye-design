/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-small'] }] */

import clsx from "clsx";
import { uniqueId } from "lodash-es";
import React, { forwardRef, useMemo } from "react";
import { SVGPathFlag, SVGPathPin } from "../../../../svg/paths";
import { VARIANT_OPTIONS } from "./options";
import styles from "./symbols.module.css";

function imageTransform(variant) {
  switch (variant) {
    case VARIANT_OPTIONS.pin:
      return "translate(0 -0.5)";
    case VARIANT_OPTIONS.flag:
      return "translate(0 -0.75)";
    default:
      return "translate(0 0)";
  }
}

const Symbol = forwardRef(
  ({ className, fill, imageSrc, imageProps, variant, ...props }, ref) => {
    const maskID = useMemo(() => uniqueId("svgMask_"), []);

    return (
      <svg
        className={clsx(styles.root, className)}
        ref={ref}
        viewBox={"0 0 10 10"}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <mask id={maskID}>
          <rect width="100%" height="100%" fill="black" />
          {variant === VARIANT_OPTIONS.circle ? (
            <circle r="5" cx="5" cy="5" fill="white" />
          ) : variant === VARIANT_OPTIONS.triangle ? (
            <circle r="5" cx="5" cy="5" fill="white" />
          ) : variant === VARIANT_OPTIONS.pin ? (
            <SVGPathPin fill="white" transform="translate(.95 0)" />
          ) : variant === VARIANT_OPTIONS.flag ? (
            <SVGPathFlag fill="white" transform="translate(.3 0)" />
          ) : (
            <rect width="100%" height="100%" fill="white" />
          )}
        </mask>
        <rect width="100%" height="100%" mask={`url(#${maskID})`} fill={fill} />
        {imageSrc ? (
          <image
            href={imageSrc}
            width="100%"
            height="100%"
            transform={imageTransform(variant)}
            {...imageProps}
          />
        ) : null}
      </svg>
    );
  }
);

export default Symbol;
