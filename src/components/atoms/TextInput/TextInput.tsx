/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed:[
  'variant-outlined', 'variant-material', 'variant-basic', 'variant-dashed',
  'variant-borderless'
]}] */
import { clsx } from "clsx";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import { useMeasureInput } from "../../../hooks/index.js";
import { COMPONENT_SIZES } from "../../../tools/constants/props.js";
import { inSubArray, isEmpty } from "../../../tools/utils.js";
import ContentLoader from "../../../vendors/ContentLoader.js";
import { FormIconSpan } from "../../../wrappers/span.js";
import { FORM_CONTROL_VARIANTS, FormInputControl } from "../FormControl.js";
import InputWrapper from "../InputWrapper.js";
import Label from "../Label.js";
import Spinner from "../Spinner/Spinner.js";
import styles from "./textInput.module.css";

export const TEXT_INPUT_VARIANTS = [
  ...FORM_CONTROL_VARIANTS,
  "material",
] as const;

export type InputDomValue = number | string | undefined;
export type InputFormValue = InputDomValue | null;

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  hasError?: boolean;
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
  required?: boolean;
  size?: (typeof COMPONENT_SIZES)[number];
  value?: InputDomValue;
  variant?: (typeof TEXT_INPUT_VARIANTS)[number];
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInputRender(
    {
      className,
      defaultValue,
      hasError,
      iconAfter,
      iconBefore,
      id = "",
      innerClassNames = {},
      isBusy,
      isLoading,
      label,
      onBlur,
      onFocus,
      required,
      size,
      style,
      value,
      variant = "basic",
      ...props
    },
    ref,
  ) {
    const [hasValue, setHasValue] = useState(!isEmpty(value ?? defaultValue));
    const [hasFocus, setHasFocus] = useState(false);
    const inputId = useId();

    const [labelRef, { input }] = useMeasureInput();

    const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setHasValue(!isEmpty(event.target.value));
        setHasFocus(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setHasFocus(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const inputStyle = useMemo(() => {
      const originalStyle = style ?? {};
      return input && variant === "material"
        ? {
            paddingTop: `calc(${input.paddingTop}px + var(--ye-input-padding-top))`,
            ...originalStyle,
          }
        : originalStyle;
    }, [input, style, variant]);

    useEffect(() => {
      setHasValue(!isEmpty(value));
    }, [value]);

    return (
      <InputWrapper
        className={clsx(
          styles.root,
          variant && styles[`variant-${variant}`],
          hasError && styles.hasError,
          hasValue && styles.hasValue,
          className,
        )}
        size={size}
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
          htmlFor={id || inputId}
          ref={labelRef}
          required={required}
          withFocus={variant === "material" && hasFocus}
          withValue={variant === "material" && hasValue}
        >
          {label}
        </Label>
        <div className={styles.inputWrapper}>
          {iconBefore && (
            <FormIconSpan
              className={clsx(styles.icon, innerClassNames.iconBefore)}
            >
              {iconBefore}
            </FormIconSpan>
          )}
          <FormInputControl
            className={clsx(
              {
                [styles.paddedLeft]: iconBefore,
                [styles.paddedRight]: iconAfter,
              },
              styles.textInput,
              innerClassNames.input,
            )}
            id={id || inputId}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={ref}
            required={required}
            style={inputStyle}
            type="text"
            value={value}
            variant={inSubArray(FORM_CONTROL_VARIANTS, variant)}
            {...props}
          />
          {iconAfter && (
            <FormIconSpan
              className={clsx(
                styles.icon,
                styles.iconRight,
                innerClassNames.iconAfter,
              )}
            >
              {iconAfter}
            </FormIconSpan>
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
      </InputWrapper>
    );
  },
);

export default TextInput;
