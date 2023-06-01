import parsePhoneNumber from "libphonenumber-js";
import { isNil } from "lodash-es";
import { Ref, forwardRef, useCallback, useRef, useState } from "react";
import FormattedInput, {
  FromattedInputProps,
} from "../FormattedInput/FormattedInput.js";

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127_397;

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replaceAll(/./g, (char) =>
      String.fromCodePoint(char.codePointAt(0) + OFFSET)
    );
}

interface PhoneNumberInputProps extends FromattedInputProps {}

export default forwardRef(
  ({ ...props }: PhoneNumberInputProps, ref: Ref<HTMLInputElement>) => {
    const textValueRef = useRef("");
    const [flag, setFlag] = useState(getFlagEmoji("IN"));

    const formatFunction = useCallback((value) => {
      if (isNil(value)) {
        textValueRef.current = value;
        return;
      }
      value = value.toString();
      textValueRef.current = value;
      const phoneNumber = parsePhoneNumber(value, { defaultCountry: "IN" });
      if (phoneNumber) {
        setFlag(getFlagEmoji(phoneNumber.country));
        return phoneNumber.formatInternational();
      }
      return textValueRef.current;
    }, []);

    const parseFunction = useCallback((formattedValue, emptyValue) => {
      let textValue = textValueRef.current;
      console.log(textValue, formattedValue);
      if (isNil(textValue)) return;
      return formattedValue.replaceAll(" ", "");
    }, []);

    return (
      <FormattedInput
        ref={ref}
        defaultValue="+91"
        format={formatFunction}
        parse={parseFunction}
        iconBefore={flag}
        {...props}
      />
    );
  }
);
