import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import {
  AsYouType,
  ParseError,
  PhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import { isNil, isString } from "lodash-es";
import { forwardRef, useCallback, useRef, useState } from "react";
import { useEffectOnce } from "react-use";

import { NumberLike } from "../../../tools/number.js";
import FormattedInput, {
  FormattedInputParse,
  FormattedInputProps,
} from "../FormattedInput/FormattedInput.js";
import styles from "./phoneNumberInput.module.css";

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127_397;

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replaceAll(/./g, (char) =>
      String.fromCodePoint((char.codePointAt(0) as number) + OFFSET),
    );
}

function getPhoneNumber(value: string) {
  try {
    return parsePhoneNumber(value, "IN");
  } catch (error) {
    if (!(error instanceof ParseError && error.message === "TOO_SHORT")) {
      throw error;
    }
  }
}

const PhoneNumberInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  (props, ref) => {
    const textValueRef = useRef<NumberLike>();
    const [flag, setFlag] = useState(getFlagEmoji("IN"));

    useEffectOnce(() => {
      polyfillCountryFlagEmojis();
    });

    const formatFunction = useCallback((value: NumberLike) => {
      if (isNil(value)) {
        textValueRef.current = "";
        return "";
      }
      value = value.toString();
      textValueRef.current = value;
      const phoneNumber = getPhoneNumber(value) as PhoneNumber;
      if (!phoneNumber?.country)
        return textValueRef.current.replaceAll(/[^\d+]/g, "");
      setFlag(getFlagEmoji(phoneNumber.country));
      return new AsYouType().input(value);
    }, []);

    const parseFunction = useCallback<FormattedInputParse>((formattedValue) => {
      const textValue = textValueRef.current;
      if (isNil(textValue) || isNil(formattedValue)) return;
      return isString(formattedValue)
        ? formattedValue.replaceAll(" ", "")
        : formattedValue;
    }, []);

    return (
      <FormattedInput
        className={styles.root}
        defaultValue="+91"
        format={formatFunction}
        iconBefore={flag}
        innerClassNames={{
          iconBefore: styles.flagIcon,
        }}
        parse={parseFunction}
        ref={ref}
        {...props}
      />
    );
  },
);

export default PhoneNumberInput;
