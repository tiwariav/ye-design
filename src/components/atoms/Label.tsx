import { clsx } from "clsx";
import { isString } from "lodash-es";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import styles from "./label.module.css";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  className?: string;
  required?: boolean | string;
  withFocus?: boolean;
  withValue?: boolean;
}

export default forwardRef<HTMLLabelElement, LabelProps>(function LabelRender(
  { children, className, htmlFor, required, withFocus, withValue, ...props },
  ref,
) {
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
          className,
        )}
        htmlFor={htmlFor}
        ref={ref}
        {...props}
      >
        {children}
        {requiredText && ` ( ${requiredText} )`}
      </label>
    )
  );
});
