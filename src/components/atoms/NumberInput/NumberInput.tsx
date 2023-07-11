import { isNil, isObject } from "lodash-es";
import { forwardRef, useCallback, useRef } from "react";

import {
  FormatNumberOptions,
  formatNumber,
  stringToNumber,
} from "../../../tools/number.js";
import { FromattedInputProps } from "../FormattedInput/FormattedInput.js";
import { FormattedInput } from "../FormattedInput/index.js";

export interface NumberInputProps
  extends Omit<FromattedInputProps, "format" | "parse"> {
  format?: FormatNumberOptions | boolean;
  parse?: boolean;
}

// storybook events dont work when default export name is same as file name

function NumberInput(
  { format, parse, ...props }: NumberInputProps,
  ref: NumberInputProps["ref"],
) {
  const textValueRef = useRef("");

  const formatFunction = useCallback(
    (value: string) => {
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
      const formatOptions = isObject(format) ? format : {};
      const formattedValue = formatNumber(value, {
        minimumFractionDigits: 0,
        nullValue,
        ...formatOptions,
      });
      if (value.split(".")[1]?.length > formattedValue.split(".")[1]?.length) {
        const newSplits = value.split(".");
        textValueRef.current = `${newSplits[0]}.${
          formattedValue.split(".")[1]
        }`;
      }
      return formattedValue;
    },
    [format],
  );

  const parseFunction = useCallback(
    (formattedValue: string, emptyValue: number | string) => {
      const textValue = textValueRef.current;
      if (textValue === undefined) return;
      const unformattedValue = format
        ? stringToNumber(formattedValue, emptyValue)
        : textValue;
      return parse || isNil(unformattedValue)
        ? unformattedValue
        : unformattedValue.toString();
    },
    [format, parse],
  );

  return (
    <FormattedInput
      format={format ? formatFunction : undefined}
      hiddenInputProps={{ type: "number" }}
      parse={parse ? parseFunction : undefined}
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(NumberInput);
