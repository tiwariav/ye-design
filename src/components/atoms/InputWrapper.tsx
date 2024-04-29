/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed:
  ['is-small', 'is-large']
}] */

import type { ComponentPropsWithoutRef, ElementType } from "react";

import clsx from "clsx";

import type { COMPONENT_SIZES } from "../../tools/constants/props.js";

import { getDynamicClassName } from "../../tools/utils.js";
import * as styles from "./inputWrapper.module.css";

interface InputWrapperProps<TElement extends ElementType> {
  as?: TElement;
  className?: string;
  size?: (typeof COMPONENT_SIZES)[number];
}

export default function InputWrapper<TElement extends ElementType>({
  as,
  className,
  size,
  ...props
}: ComponentPropsWithoutRef<TElement> & InputWrapperProps<TElement>) {
  const Element = as ?? "div";
  return (
    <Element
      className={clsx(
        size && getDynamicClassName(styles, `is-${size}`),
        className,
      )}
      {...props}
    />
  );
}
