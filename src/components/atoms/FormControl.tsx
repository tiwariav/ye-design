/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed:
  ['variant-borderless', 'variant-outlined', 'variant-dashed', 'variant-basic']
}] */

import clsx from "clsx";
import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";

import styles from "./formControl.module.css";

export const FORM_CONTROL_VARIANTS = [
  "basic",
  "borderless",
  "outlined",
  "dashed",
] as const;

interface FormControlProps {
  className?: string;
  variant?: (typeof FORM_CONTROL_VARIANTS)[number];
}

function formControlProps<TElement>(
  { className, variant, ...props }: FormControlProps,
  ref: Ref<TElement>,
) {
  return {
    className: clsx(
      styles.root,
      className,
      variant && styles[`variant-${variant}`],
    ),
    ref,
    ...props,
  };
}

export const FormInputControl = forwardRef<
  HTMLInputElement,
  FormControlProps & ComponentPropsWithoutRef<"input">
>(function FormInputControlRender(props, ref) {
  return <input {...formControlProps(props, ref)} />;
});

export const FormButtonControl = forwardRef<
  HTMLButtonElement,
  FormControlProps & ComponentPropsWithoutRef<"button">
>(function FormButtonControlRender(props, ref) {
  return <button {...formControlProps(props, ref)} />;
});
