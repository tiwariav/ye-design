import { isNil } from "lodash-es";
import { Ref, forwardRef, useCallback, useMemo, useRef } from "react";
import { formatNumber, stringToNumber } from "../../../tools/number.js";
import { FromattedInputProps } from "../FormattedInput/FormattedInput.js";
import { FormattedInput } from "../FormattedInput/index.js";

interface NumberInputProps
  extends Omit<FromattedInputProps, "format" | "parse"> {
  format?: boolean;
  parse?: boolean;
  formatOptions?: object;
}

// storybook events dont work when default export name is same as file name

export default forwardRef(
  (
    { format, parse, formatOptions = {}, ...props }: NumberInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const textValueRef = useRef("");

    const formatFunction = useCallback(
      (value) => {
        if (!format || isNil(value)) {
          textValueRef.current = value;
          return;
        }
        value = value.toString();
        textValueRef.current = value;
        if (value.endsWith(".") || value === "-") {
          return value;
        }
        const nullValue = value ? "0" : "";
        const formattedValue = formatNumber(value, {
          minimumFractionDigits: 0,
          nullValue,
          ...formatOptions,
        });
        if (
          value.split(".")[1]?.length > formattedValue.split(".")[1]?.length
        ) {
          const newSplits = value.split(".");
          textValueRef.current = `${newSplits[0]}.${
            formattedValue.split(".")[1]
          }`;
        }
        return formattedValue;
      },
      [format, formatOptions]
    );

    const parseFunction = useCallback(
      (formattedValue, emptyValue) => {
        let textValue = textValueRef.current;
        if (textValue === undefined) return;
        const unformattedValue = format
          ? stringToNumber(formattedValue, emptyValue)
          : textValue;
        return parse || isNil(unformattedValue)
          ? unformattedValue
          : unformattedValue.toString();
      },
      [format, parse]
    );

    const dataFormattingProps = useMemo(
      () => ({
        ...(format ? { format: formatFunction } : {}),
        ...(parse ? { parse: parseFunction } : {}),
      }),
      [format, formatFunction, parse, parseFunction]
    );

    return (
      <FormattedInput
        ref={ref}
        hiddenInputProps={{ type: "number" }}
        {...dataFormattingProps}
        {...props}
      />
    );
  }
);
