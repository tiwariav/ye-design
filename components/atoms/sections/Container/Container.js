/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-secondary', 'align-center', 'width-xsmall', 'width-small', 'height-readable', 'height-full',
  'space-none', 'space-small', 'space-large', 'space-horizontal'
]}] */

import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./container.module.css";

function Container({
  spacing,
  children,
  align,
  className,
  variant = "basic",
  width,
  height,
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.container,
        styles[`space-${spacing}`],
        styles[`is-${variant}`],
        {
          [styles[`align-${align}`]]: align,
          [styles[`width-${width}`]]: width,
          [styles[`height-${height}`]]: height,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  /**
   * How large should the padding be?
   */
  spacing: PropTypes.oneOf(["none", "small", "medium", "large", "horizontal"]),
};

Container.defaultProps = {
  spacing: "medium",
};

export default Container;
