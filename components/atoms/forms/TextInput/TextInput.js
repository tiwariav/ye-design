/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined'] }] */
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";
import { forwardRef, useMemo, useState } from "react";
import ContentLoader from "react-content-loader";
import { useMeasureInput } from "../../../../hooks";
import { isEmpty } from "../../../../lib/utils";
import Spinner from "../../content/Spinner/Spinner";
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

const TextInput = forwardRef(
  (
    {
      className,
      errors,
      iconBefore,
      iconAfter,
      id,
      inputClassName,
      isBusy,
      isLoading,
      label,
      onFocus,
      onBlur,
      placeholder,
      size,
      style = {},
      spacing,
      value,
      variant,
      required,
      requiredText,
      ...props
    },
    ref
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
            {requiredText ? ` ( ${requiredText})` : null}
          </label>
        ) : null}
        <div className={styles.inputWrapper}>
          {iconBefore ? (
            <span className={clsx(styles.iconWrapper)}>
              <span className={clsx(formStyles.icon)}>{iconBefore}</span>
            </span>
          ) : null}
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
              inputClassName
            )}
            placeholder={
              variant === "material" && (!isEmpty(value) || hasFocus)
                ? placeholder
                : ""
            }
            required
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
          {iconAfter ? (
            <span className={clsx(styles.iconWrapper, styles.iconRight)}>
              <span className={clsx(formStyles.icon)}>{iconAfter}</span>
            </span>
          ) : null}
          {isLoading ? (
            <ContentLoader
              viewBox={`0 0 100 100`}
              preserveAspectRatio="none"
              className={styles.loader}
            >
              <rect x="0" y="0" width={100} height={100} />
            </ContentLoader>
          ) : null}
          {isBusy ? <Spinner className={styles.spinner} /> : null}
        </div>
        {errors && errors.length > 0 ? (
          <div className={styles.errors}>
            {errors.map((message) => (
              <p className={styles.errorItem}>{message}</p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

TextInput.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Icon element
   */
  iconBefore: PropTypes.element,
  /**
   * Icon element
   */
  iconAfter: PropTypes.element,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Label text
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};

TextInput.defaultProps = {
  size: "medium",
};

export default TextInput;
