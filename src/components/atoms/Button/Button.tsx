/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-outlined, is-dashed, is-trans, is-inline, is-neu,
  is-list-item, is-primary, is-filled,
  is-small, is-large,
  effect-cursor-tracking, effect-ripple,
  spacing-equal, spacing-extra, spacing-less, spacing-none
]}] */

import { clsx } from "clsx";
import {
  ComponentPropsWithRef,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
} from "react";
import { useMouseHovered } from "react-use";

import { usePropRef } from "../../../hooks/index.js";
import { overrideStyleProperty } from "../../../tools/css.js";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import styles from "./button.module.css";

const setRippleProperties = (node: HTMLElement, initial, x = 0, y = 0) => {
  node.style.setProperty("--ye-effect-ripple-x", `${x}px`);
  node.style.setProperty("--ye-effect-ripple-y", `${y}px`);
  if (initial) {
    node.style.setProperty(
      "--ye-effect-ripple-diameter",
      `${Math.max(node.clientWidth, node.clientHeight) * 2}px`,
    );
  }
};

const setTrackingProperties = (node: HTMLElement, x = 0, y = 0) => {
  node.style.setProperty("--ye-effect-tracking-x", `${x}px`);
  node.style.setProperty("--ye-effect-tracking-y", `${y}px`);
};

type NeuOptions = {
  colors?: {
    backgroundDark?: string;
    backgroundLight?: string;
    shadowDark?: string;
    shadowLight?: string;
  };
};

const setNeuProperties = (node: HTMLElement, options: NeuOptions = {}) => {
  overrideStyleProperty(
    "--ye-color-neu-background-dark",
    options.colors?.backgroundDark,
    node,
  );
  overrideStyleProperty(
    "--ye-color-neu-background-light",
    options.colors?.backgroundLight,
    node,
  );
  overrideStyleProperty(
    "--ye-color-neu-shadow-dark",
    options.colors?.shadowDark,
    node,
  );
  overrideStyleProperty(
    "--ye-color-neu-shadow-light",
    options.colors?.shadowLight,
    node,
  );
};

const BUTTON_EFFECT_OPTIONS = ["ripple", "cursor-tracking"];
const BUTTON_SPACING_OPTIONS = ["none", "less", "equal", "extra"];
const BUTTON_SIZE_OPTIONS = ["small", "medium", "large"];
const BUTTON_VARIANT_OPTIONS = [
  "basic",
  "trans",
  "inline",
  "list-item",
  "outlined",
  "primary",
  "filled",
  "neu",
];

type SharedButtonProps = {
  effects?: (typeof BUTTON_EFFECT_OPTIONS)[number][];
  neuOptions?: NeuOptions;
  variant?: (typeof BUTTON_VARIANT_OPTIONS)[number];
};

function useButtonEffects({
  effects,
  innerRef,
  neuOptions,
  variant,
}: SharedButtonProps & {
  innerRef: MutableRefObject<HTMLButtonElement>;
}) {
  const mouseData = useMouseHovered(innerRef, {
    bound: true,
    whenHovered: true,
  });
  useEffect(() => {
    if (!innerRef.current) return;

    if (variant === "neu") {
      setNeuProperties(innerRef.current, neuOptions);
    }
    if (effects.length === 0) return;

    if (effects.includes("cursor-tracking")) {
      setTrackingProperties(innerRef.current, mouseData.elX, mouseData.elY);
    }
    if (effects.includes("ripple")) {
      setRippleProperties(innerRef.current, true);
    }
    if (effects.includes("ripple")) {
      setRippleProperties(innerRef.current, true);
    }
  }, [effects, mouseData, variant, neuOptions, innerRef]);
}

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    SharedButtonProps {
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  isBusy?: boolean;
  isFullWidth?: boolean;
  label?: string;
  size?: (typeof BUTTON_SIZE_OPTIONS)[number];
  spacing?: (typeof BUTTON_SPACING_OPTIONS)[number];
}

/**
 * Primary UI component for user interaction
 */
function Button(
  {
    children,
    className,
    disabled,
    effects = [],
    iconAfter,
    iconBefore,
    isBusy,
    isFullWidth,
    label,
    neuOptions,
    onClick,
    size = "medium",
    spacing,
    variant = "basic",
    ...props
  }: ButtonProps,
  propRef: ButtonProps["ref"],
) {
  const { innerRef, setInnerRef } = usePropRef(propRef);

  useButtonEffects({
    effects,
    innerRef,
    neuOptions,
    variant,
  });

  const effectClasses = effects.map((eff) => styles[`effect-${eff}`]);

  return (
    <button
      className={clsx(
        formStyles.control,
        formStyles[`is-${variant}`],
        styles.root,
        styles[`is-${size}`],
        styles[`is-${variant}`],
        {
          [styles.disabled]: disabled,
          // eslint-disable-next-line css-modules/no-undef-class
          [styles.hasFocus]: isBusy,
          [styles.isFullWidth]: isFullWidth,
          [styles[`spacing-${spacing}`]]: spacing,
        },
        ...effectClasses,
        className,
      )}
      onClick={(event) => {
        if (effects.includes("ripple")) {
          setRippleProperties(
            innerRef.current,
            false,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY,
          );
        }
        onClick?.(event);
      }}
      disabled={disabled || isBusy}
      ref={setInnerRef}
      type="button"
      {...props}
    >
      {iconBefore && (
        // eslint-disable-next-line css-modules/no-undef-class
        <span className={clsx(formStyles.icon, styles.icon)}>{iconBefore}</span>
      )}
      {(iconBefore || iconAfter) && (label || children) ? (
        <span>
          {label}
          {children}
        </span>
      ) : (
        <>
          {label}
          {children}
        </>
      )}
      {iconAfter && (
        // eslint-disable-next-line css-modules/no-undef-class
        <span className={clsx(formStyles.icon, styles.icon)}>{iconAfter}</span>
      )}
      {isBusy && <Spinner className={styles.spinner} />}
    </button>
  );
}

export default forwardRef(Button);
