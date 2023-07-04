import { clsx } from "clsx";
import { isString } from "lodash-es";
import { ComponentPropsWithRef, forwardRef } from "react";

import styles from "./label.module.css";

interface LabelProps extends ComponentPropsWithRef<"label"> {
  className?: string;
  inputId: string;
  required?: boolean | string;
  withFocus?: boolean;
  withValue?: boolean;
}

export default forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, inputId, required, withFocus, withValue }, ref) => {
    const requiredText = isString(required) && required;
    return (
      children && (
        <label
          className={clsx(
            styles.root,
            {
              [styles.required]: required && !requiredText,
              [styles.withFocus]: withFocus,
              [styles.withValue]: withValue,
            },
            className
          )}
          htmlFor={inputId}
          ref={ref}
        >
          {children}
          {requiredText && ` ( ${requiredText} )`}
        </label>
      )
    );
  }
);
