/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined', 'is-material', 'is-basic', 'is-dashed'] }] */
import { clsx } from "clsx";
import { omit } from "lodash-es";
import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useState,
} from "react";

import { useMeasureInput } from "../../../hooks/index.js";
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
    iconAfter?: string;
    iconBefore?: string;
    input?: string;
    label?: string;
  };
  isBusy?: boolean;
  isLoading?: boolean;
  label?: ReactNode;
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
      defaultValue,
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
    const [hasValue, setHasValue] = useState(!isEmpty(value || defaultValue));

    const inputId = useId();

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

    useEffect(() => {
      setHasValue(!isEmpty(value));
    }, [value]);

    return (
      <div
        className={clsx(
          styles.root,
          size && formStyles[`is-${size}`],
          variant && styles[`is-${variant}`],
          {
            [styles.hasFocus]: hasFocus,
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasValue]: hasValue,
          },
          className,
        )}
      >
        <Label
          className={clsx(
            styles.label,
            {
              [styles.paddedLeft]: iconBefore,
              [styles.paddedRight]: iconAfter,
            },
            innerClassNames.label,
          )}
          inputId={inputId}
          ref={labelRef}
          required={required}
        >
          {label}
        </Label>
        <div className={styles.inputWrapper}>
          {iconBefore && (
            <span className={clsx(styles.iconWrapper)}>
              <span
                className={clsx(formStyles.icon, innerClassNames.iconBefore)}
              >
                {iconBefore}
              </span>
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
            id={inputId}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={
              variant === "material"
                ? hasValue || hasFocus
                  ? placeholder
                  : ""
                : placeholder
            }
            ref={ref}
            required={required}
            style={
              input && variant === "material"
                ? {
                    paddingTop: `calc(${input.paddingTop}px + var(--module-input-padding-top))`,
                    ...style,
                  }
                : style
            }
            type="text"
            value={value}
            {...props}
          />
          {iconAfter && (
            <span className={clsx(styles.iconWrapper, styles.iconRight)}>
              <span
                className={clsx(formStyles.icon, innerClassNames.iconAfter)}
              >
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
