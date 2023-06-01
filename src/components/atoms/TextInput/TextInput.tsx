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
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  id?: string;
  innerClassNames?: {
    input?: string;
  };
  isBusy?: boolean;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  style?: object;
  spacing?: "none" | "small" | "medium" | "large";
  value?: string;
  variant?: (typeof variants)[number];
  required?: boolean;
  requiredText?: string;
}

const TextInput = forwardRef(
  (
    {
      className,
      errors,
      iconBefore,
      iconAfter,
      id,
      innerClassNames = {},
      isBusy,
      isLoading,
      label,
      onFocus,
      onBlur,
      placeholder,
      size = "medium",
      style = {},
      spacing,
      value,
      variant,
      required,
      requiredText,
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
            [styles.hasValue]: !isEmpty(value),
          },
          className
        )}
      >
        {label ? (
          <label
            ref={labelRef}
            htmlFor={inputID}
            className={clsx(styles.label, {
              [styles["required"]]: required && !requiredText,
            })}
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
            id={inputID}
            type="text"
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
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            value={value}
            style={
              input
                ? {
                    paddingTop: `calc(${input.paddingTop}px + var(--input-padding-top))`,
                    ...style,
                  }
                : style
            }
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
              viewBox={`0 0 100 100`}
              preserveAspectRatio="none"
              className={styles.loader}
            >
              <rect x="0" y="0" width={100} height={100} />
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
