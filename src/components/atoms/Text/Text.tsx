import { clsx } from "clsx";
import { CSSProperties, ComponentPropsWithoutRef, memo } from "react";

import Spinner from "../Spinner/Spinner.js";
import TextLoader from "./TextLoader.js";
import styles from "./text.module.css";

interface TextProps extends ComponentPropsWithoutRef<"div"> {
  inline?: boolean;
  isBusy?: boolean;
  isLoading?: boolean;
  lineHeight?: number;
  loaderStyles?: CSSProperties;
  maxLines?: number;
  minLines?: number;
}

function Text({
  children,
  className,
  inline,
  isBusy,
  isLoading,
  lineHeight,
  loaderStyles,
  maxLines,
  minLines = 1,
  style,
  ...props
}: TextProps) {
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
      {isLoading ? (
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

export default memo(Text);
