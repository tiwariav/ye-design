/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  'is-basic', 'is-horizontal', 'is-borderless', 'view-thumb',
  'floating-highest', 'floating-high', 'floating-medium', 'floating-low', 'floating-lowest', 'floating-none',
  'height-full'
]}] */

import { clsx } from "clsx";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./card.module.css";

export default function Card({
  layout = "vertical",
  variant = "basic",
  viewMode = "full",
  image,
  busy,
  children,
  className,
  floating,
  flying,
  height,
  cardContentClassName,
  ...props
}) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`is-${variant}`],
        styles[`is-${layout}`],
        styles[`view-${viewMode}`],
        {
          [styles[`floating-${floating}`]]: floating,
          [styles[`flying-${flying}`]]: flying,
          [styles[`height-${height}`]]: height,
        },
        className
      )}
      {...props}
    >
      {image ? <div className={styles.image}>{image}</div> : null}
      {children ? (
        <div className={clsx([styles.content], cardContentClassName)}>
          {children}
        </div>
      ) : null}
      {busy ? <Spinner /> : null}
    </div>
  );
}
