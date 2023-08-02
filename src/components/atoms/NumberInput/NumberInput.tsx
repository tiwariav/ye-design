import { isNil } from "lodash-es";
import { Ref, forwardRef, useCallback, useRef } from "react";

import {
  FormatNumberProps,
  formatNumber,
  stringToNumber,
} from "../../../tools/number.js";
import { FromattedInputProps } from "../FormattedInput/FormattedInput.js";
import { FormattedInput } from "../FormattedInput/index.js";

export interface NumberInputProps
  extends Omit<FromattedInputProps, "format" | "parse"> {
  format?: boolean;
  formatOptions?: FormatNumberProps;
  parse?: boolean;
}

// storybook events dont work when default export name is same as file name

export default forwardRef(
  (
    { format, formatOptions = {}, parse, ...props }: NumberInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const textValueRef = useRef<string>();

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
        const newValueDecimals = value.split(".")[1]?.length;
        const minimumFractionDigits =
          formatOptions.minimumFractionDigits ?? newValueDecimals ?? 0;
        const nullValue = value ? "0" : "";
        const formattedValue = formatNumber(value, {
          maximumFractionDigits: 2,
          nullValue,
          ...formatOptions,
          minimumFractionDigits,
        });
        if (newValueDecimals > formattedValue.split(".")[1]?.length) {
          // if the input value decimals are more than format options,
          // reduce the decimals for input to parseFucntion
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
        const textValue = textValueRef.current;
        if (isNil(textValue)) return emptyValue;
        const unformattedValue = format
          ? stringToNumber(formattedValue, emptyValue)
          : textValue;
        return parse || isNil(unformattedValue)
          ? unformattedValue
          : unformattedValue.toString();
      },
      [format, parse]
    );

    return (
      <FormattedInput
        format={format ? formatFunction : undefined}
        hiddenInputProps={{ type: "number" }}
        inputMode="decimal"
        parse={parseFunction}
        ref={ref}
        {...props}
      />
    );
  }
);
