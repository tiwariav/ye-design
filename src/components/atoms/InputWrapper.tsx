/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed:
  ['is-small', 'is-large']
}] */

import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";

import { COMPONENT_SIZES } from "../../tools/constants/props.js";
import styles from "./inputWrapper.module.css";

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
}: InputWrapperProps<TElement> & ComponentPropsWithoutRef<TElement>) {
  const Element = as || "div";
  return (
    <Element
      className={clsx(size && styles[`is-${size}`], className)}
      {...props}
    />
  );
}
