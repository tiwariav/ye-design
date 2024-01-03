import clsx from "clsx";
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

import FormattedInput, {
  FormattedInputParse,
  FormattedInputProps,
} from "../FormattedInput/FormattedInput.js";
import { InputDomValue } from "../TextInput/TextInput.js";
import styles from "./phoneNumberInput.module.css";

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127_397;

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replaceAll(/./g, (char) =>
      String.fromCodePoint(char.codePointAt(0)! + OFFSET),
    );
}

function getPhoneNumber(value: string) {
  try {
    return parsePhoneNumber(value, "IN");
  } catch (error) {
    if (!(error instanceof ParseError)) throw error;
    if (
      (error.message === "NOT_A_NUMBER" && !/[^+]/.test(value)) ||
      (error.message === "TOO_SHORT" && /^\+?[\d\s]+-*$/.test(value))
    ) {
      // return empty string to allow value change
      return "";
    }
    throw error;
  }
}

const PhoneNumberInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  function PhoneNumberInputRender(
    { defaultValue = "+91", variant, ...props },
    ref,
  ) {
    const textValueRef = useRef<string>(defaultValue.toString());
    const [flag, setFlag] = useState(getFlagEmoji("IN"));

    useEffectOnce(() => {
      polyfillCountryFlagEmojis();
    });

    const formatFunction = useCallback((value: InputDomValue) => {
      if (isNil(value)) {
        textValueRef.current = "";
        return "";
      }
      value = value.toString();
      let phoneNumber;
      try {
        phoneNumber = getPhoneNumber(value) as PhoneNumber;
      } catch {
        // unhandled error, dont update input value
        return textValueRef.current;
      }
      textValueRef.current = value;
      if (!phoneNumber?.country) {
        textValueRef.current = value;
        return textValueRef.current;
      }
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
        autoComplete="tel-national"
        className={clsx(
          styles.root,
          variant === "material" && styles.variantMaterial,
        )}
        defaultValue={defaultValue}
        format={formatFunction}
        iconBefore={flag}
        innerClassNames={{ iconBefore: styles.flagIcon, label: styles.label }}
        inputMode="numeric"
        parse={parseFunction}
        ref={ref}
        type="text"
        variant={variant}
        {...props}
      />
    );
  },
);

export default PhoneNumberInput;
