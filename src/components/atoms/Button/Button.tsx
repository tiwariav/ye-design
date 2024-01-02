/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  variant-outlined, variant-dashed, variant-inline, variant-neu, variant-list-item,
  variant-primary, variant-filled, variant-basic, variant-borderless,
  size-small, size-large,
  effect-cursor-tracking, effect-ripple,
  spacing-equal, spacing-extra, spacing-less, spacing-none
]}] */

import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
} from "react";
import { useMouseHovered } from "react-use";
import { overrideStyleProperty } from "wo-library/tools/css.js";

import { usePropRef } from "../../../hooks/index.js";
import {
  COMPONENT_SIZES,
  COMPONENT_SPACINGS,
} from "../../../tools/constants/props.js";
import { inSubArray } from "../../../tools/utils.js";
import { FormIconSpan } from "../../../wrappers/span.js";
import { FORM_CONTROL_VARIANTS, FormButtonControl } from "../FormControl.js";
import Spinner from "../Spinner/Spinner.js";
import styles from "./button.module.css";

const setRippleProperties = (
  node: HTMLElement | null,
  initial: boolean,
  x = 0,
  y = 0,
) => {
  if (!node) return;
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

interface NeuOptions {
  colors?: {
    backgroundDark?: string;
    backgroundLight?: string;
    shadowDark?: string;
    shadowLight?: string;
  };
}

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

export const BUTTON_EFFECTS = ["ripple", "cursor-tracking"] as const;
export const BUTTON_SPACINGS = [
  ...COMPONENT_SPACINGS,
  "none",
  "equal",
] as const;
export const BUTTON_VARIANTS = [
  ...FORM_CONTROL_VARIANTS,
  "inline",
  "list-item",
  "primary",
  "filled",
  "neu",
] as const;

interface SharedButtonProps {
  effects?: (typeof BUTTON_EFFECTS)[number][];
  neuOptions?: NeuOptions;
  variant?: (typeof BUTTON_VARIANTS)[number];
}

function useButtonEffects({
  effects = [],
  innerRef,
  neuOptions,
  variant,
}: SharedButtonProps & {
  innerRef: MutableRefObject<HTMLButtonElement | null>;
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
  extends ComponentPropsWithoutRef<"button">,
    SharedButtonProps {
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  isBusy?: boolean;
  isFullWidth?: boolean;
  size?: (typeof COMPONENT_SIZES)[number];
  spacing?: (typeof BUTTON_SPACINGS)[number];
}

/**
 * Primary UI component for user interaction
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonRender(
  {
    children,
    className,
    disabled = false,
    effects = [],
    iconAfter,
    iconBefore,
    isBusy = false,
    isFullWidth = false,
    neuOptions,
    onClick,
    size,
    spacing,
    variant = "basic",
    ...props
  },
  propRef,
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
    <FormButtonControl
      className={clsx(
        styles.root,
        size && styles[`size-${size}`],
        variant && styles[`variant-${variant}`],
        {
          [styles.isDisabled]: disabled || isBusy,
          [styles.isFullWidth]: isFullWidth,
        },
        spacing && styles[`spacing-${spacing}`],
        ...effectClasses,
        className,
      )}
      disabled={disabled || isBusy}
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
      ref={setInnerRef}
      type="button"
      variant={inSubArray(FORM_CONTROL_VARIANTS, variant)}
      {...props}
    >
      {iconBefore && (
        <FormIconSpan className={styles.icon}>{iconBefore}</FormIconSpan>
      )}
      {(iconBefore ?? iconAfter) && children ? (
        <span>{children}</span>
      ) : (
        children
      )}
      {iconAfter && (
        <FormIconSpan className={styles.icon}>{iconAfter}</FormIconSpan>
      )}
      {isBusy && <Spinner />}
    </FormButtonControl>
  );
});

export default Button;
