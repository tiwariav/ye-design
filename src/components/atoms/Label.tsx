import { clsx } from "clsx";
import { isString } from "lodash-es";
import { ComponentPropsWithRef, forwardRef } from "react";

import styles from "./label.module.css";

interface LabelProps extends ComponentPropsWithRef<"label"> {
  className?: string;
  inputId: string;
  required?: boolean | string;
}

export default forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, inputId, required }, ref) => {
    const requiredText = isString(required) && required;
    return (
      children && (
        <label
          className={clsx(
            styles.root,
            {
              [styles.required]: required && !requiredText,
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
