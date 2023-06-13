/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined', 'is-material'] }] */
import { clsx } from "clsx";
import { uniqueId } from "lodash-es";
import { InputHTMLAttributes, Ref, forwardRef, useMemo, useState } from "react";

import { useMeasureInput } from "../../../hooks/index.js";
import { isEmpty } from "../../../tools/utils.js";
import ContentLoader from "../../../vendors/ContentLoader.js";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import styles from "./textInput.module.css";

export const variants = [
  "basic",
  "outlined",
  "dashed",
  "borderless",
  "material",
];

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  errors?: string[];
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  id?: string;
  innerClassNames?: {
    input?: string;
  };
  isBusy?: boolean;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  requiredText?: string;
  size?: "large" | "medium" | "small";
  spacing?: "large" | "medium" | "none" | "small";
  style?: object;
  value?: string;
  variant?: (typeof variants)[number];
}

const TextInput = forwardRef(
  (
    {
      className,
      errors,
      iconAfter,
      iconBefore,
      id,
      innerClassNames = {},
      isBusy,
      isLoading,
      label,
      onBlur,
      onFocus,
      placeholder,
      required,
      requiredText,
      size = "medium",
      spacing,
      style = {},
      value,
      variant,
      ...props
    }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [hasFocus, setHasFocus] = useState(false);

    const inputID = useMemo(() => id || uniqueId("textInput_"), [id]);

    const handleFocus = (event) => {
      setHasFocus(true);
      if (onFocus) {
        onFocus(event);
      }
    };
    const handleBlur = (event) => {
      setHasFocus(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const [labelRef, { input }] = useMeasureInput();
    return (
      <div
        className={clsx(
          styles.root,
          formStyles[`is-${size}`],
          styles[`is-${variant}`],
          {
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasFocus]: hasFocus,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasValue]: !isEmpty(value),
          },
          className
        )}
      >
        {label ? (
          <label
            className={clsx(styles.label, {
              [styles["required"]]: required && !requiredText,
            })}
            htmlFor={inputID}
            ref={labelRef}
          >
            {label}
            {requiredText && ` ( ${requiredText})`}
          </label>
        ) : null}
        <div className={styles.inputWrapper}>
          {iconBefore && (
            <span className={clsx(styles.iconWrapper)}>
              <span className={clsx(formStyles.icon)}>{iconBefore}</span>
            </span>
          )}
          <input
            className={clsx(
              formStyles.control,
              formStyles[`is-${variant}`],
              {
                [styles.paddedLeft]: iconBefore,
                [styles.paddedRight]: iconAfter,
                [styles[`space-${spacing}`]]: spacing,
              },
              styles.textInput,
              innerClassNames.input
            )}
            placeholder={
              variant === "material"
                ? !isEmpty(value) || hasFocus
                  ? placeholder
                  : ""
                : placeholder
            }
            style={
              input
                ? {
                    paddingTop: `calc(${input.paddingTop}px + var(--input-padding-top))`,
                    ...style,
                  }
                : style
            }
            id={inputID}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={ref}
            required={required}
            type="text"
            value={value}
            {...props}
          />
          {iconAfter && (
            <span className={clsx(styles.iconWrapper, styles.iconRight)}>
              <span className={clsx(formStyles.icon, innerClassNames.input)}>
                {iconAfter}
              </span>
            </span>
          )}
          {isLoading && (
            <ContentLoader
              className={styles.loader}
              preserveAspectRatio="none"
              viewBox={`0 0 100 100`}
            >
              <rect height={100} width={100} x="0" y="0" />
            </ContentLoader>
          )}
          {isBusy && <Spinner className={styles.spinner} />}
        </div>
        {errors && errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((message) => (
              <p className={styles.errorItem}>{message}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default TextInput;
