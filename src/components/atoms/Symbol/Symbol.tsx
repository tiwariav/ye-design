/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-small'] }] */

import { clsx } from "clsx";
import { uniqueId } from "lodash-es";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
  useMemo,
} from "react";

import { SVGPathFlag, SVGPathPin } from "../../../svg/paths/index.js";
import styles from "./symbol.module.css";

enum SYMBOL_VARIANT_OPTIONS {
  CIRCLE,
  FLAG,
  PIN,
  TRIANGLE,
}

function imageTransform(variant) {
  switch (variant) {
    case SYMBOL_VARIANT_OPTIONS.PIN: {
      return "translate(0 -0.5)";
    }
    case SYMBOL_VARIANT_OPTIONS.FLAG: {
      return "translate(0 -0.75)";
    }
    default: {
      return "translate(0 0)";
    }
  }
}
interface SymbolProps extends ComponentPropsWithRef<"svg"> {
  fill?: string;
  imageProps?: ComponentPropsWithoutRef<"image">;
  imageSrc?: string;
  variant?: SYMBOL_VARIANT_OPTIONS;
}

function Symbol(
  { className, fill, imageProps, imageSrc, variant, ...props }: SymbolProps,
  ref: SymbolProps["ref"],
) {
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
        {variant === SYMBOL_VARIANT_OPTIONS.CIRCLE ? (
          <circle cx="5" cy="5" fill="white" r="5" />
        ) : variant === SYMBOL_VARIANT_OPTIONS.TRIANGLE ? (
          <circle cx="5" cy="5" fill="white" r="5" />
        ) : variant === SYMBOL_VARIANT_OPTIONS.PIN ? (
          <SVGPathPin fill="white" transform="translate(.95 0)" />
        ) : variant === SYMBOL_VARIANT_OPTIONS.FLAG ? (
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

export default forwardRef(Symbol);
