import { clsx } from "clsx";
import { CSSProperties } from "react";

import Spinner from "../Spinner/Spinner.js";
import TextLoader from "./TextLoader.js";
import styles from "./text.module.css";

function Text({
  children,
  className,
  inline,
  isBusy,
  lineHeight,
  loaderStyles,
  loading,
  maxLines,
  minLines = 1,
  style,
  ...props
}: any) {
  const textStyles: CSSProperties = {};
  const inlineHeight = lineHeight || 1.5;
  if (maxLines) {
    textStyles.maxHeight = `${maxLines * inlineHeight}em`;
    textStyles.WebkitLineClamp = maxLines;
  }
  if (minLines) {
    textStyles.minHeight = `${minLines * inlineHeight}em`;
  }

  const Wrapper = inline ? "span" : "div";

  return (
    <Wrapper
      className={clsx(styles.text, { [styles.inline]: inline }, className)}
      style={{ ...textStyles, ...style }}
      {...props}
    >
      {loading ? (
        <TextLoader
          className={styles.loader}
          lines={minLines}
          style={{ height: textStyles.minHeight, ...loaderStyles }}
        />
      ) : (
        children
      )}
      {isBusy && <Spinner />}
    </Wrapper>
  );
}

export default Text;
