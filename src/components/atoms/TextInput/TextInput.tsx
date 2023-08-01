/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined', 'is-material', 'is-basic', 'is-dashed'] }] */
import { clsx } from "clsx";
import { omit, uniqueId } from "lodash-es";
import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from "react";

import { useMeasureInput } from "../../../hooks/index.js";
import { EXCLUDE_HANDLERS } from "../../../tools/input.js";
import { isEmpty } from "../../../tools/utils.js";
import ContentLoader from "../../../vendors/ContentLoader.js";
import Label from "../Label.js";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import styles from "./textInput.module.css";

const TEXT_INPUT_VARIANT_OPTIONS = ["outlined", "dashed", "material"] as const;
const TEXT_INPUT_SIZE_OPTIONS = ["small", "large"] as const;

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  innerClassNames?: {
    input?: string;
  };
  isBusy?: boolean;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  requiredText?: string;
  size?: (typeof TEXT_INPUT_SIZE_OPTIONS)[number];
  style?: CSSProperties;
  value?: number | string;
  variant?: (typeof TEXT_INPUT_VARIANT_OPTIONS)[number];
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
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
      size,
      style = {},
      value,
      variant,
      ...props
    },
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);

    const inputID = useMemo(() => id || uniqueId("textInput_"), [id]);

    const handleFocus: typeof onFocus = (event) => {
      setHasFocus(true);
      if (onFocus) {
        onFocus(event);
      }
    };
    const handleBlur: typeof onBlur = (event) => {
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
          size && formStyles[`is-${size}`],
          variant && styles[`is-${variant}`],
          {
            [styles.hasFocus]: hasFocus,

            [styles.hasValue]: !isEmpty(value),
          },
          className,
        )}
      >
        <Label
          className={styles.label}
          inputId={inputID}
          ref={labelRef}
          required={required}
        >
          {label}
        </Label>
        <div className={styles.inputWrapper}>
          {iconBefore && (
            <span className={clsx(styles.iconWrapper)}>
              <span className={clsx(formStyles.icon)}>{iconBefore}</span>
            </span>
          )}
          <input
            className={clsx(
              formStyles.control,
              // @ts-ignore: TS7057 because of the `variant` prop
              variant && formStyles[`is-${variant}`],
              {
                [styles.paddedLeft]: iconBefore,
                [styles.paddedRight]: iconAfter,
              },
              styles.textInput,
              innerClassNames.input,
            )}
            placeholder={
              variant === "material"
                ? !isEmpty(value) || hasFocus
                  ? placeholder
                  : ""
                : placeholder
            }
            style={
              input && variant === "material"
                ? {
                    paddingTop: `calc(${input.paddingTop}px + var(--module-input-padding-top))`,
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
            {...omit(props, EXCLUDE_HANDLERS)}
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
      </div>
    );
  },
);

export default TextInput;
