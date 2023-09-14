import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  forwardRef,
} from "react";

export default function generateCssWrapper<
  C extends ElementType,
  Props extends ComponentPropsWithoutRef<C>,
>(rootClassName: string, as?: C, defaultProps?: Props) {
  return forwardRef<Props["ref"], Props & { className: string }>(
    ({ className, ...props }, ref) => {
      const Component = as || "div";
      return (
        <Component
          className={clsx(rootClassName, className)}
          ref={ref}
          {...defaultProps}
          {...props}
        />
      );
    },
  ) as ComponentType<Props>;
}
