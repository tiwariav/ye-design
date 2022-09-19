import { clsx } from "clsx";
import Spinner from "../Spinner/Spinner.js";
import styles from "./text.module.css";
import TextLoader from "./TextLoader.js";

function Text({
  children,
  loading,
  isBusy,
  minLines = 1,
  maxLines,
  lineHeight,
  style,
  className,
  inline,
  loaderStyles,
  ...props
}: any) {
  const textStyles = {} as any;
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
          lines={minLines}
          className={styles.loader}
          style={{ height: textStyles.minHeight, ...loaderStyles }}
        />
      ) : (
        children
      )}
      {isBusy ? <Spinner /> : null}
    </Wrapper>
  );
}

export default Text;
