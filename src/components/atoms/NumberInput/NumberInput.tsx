import { isNil, isObject, isString, uniqueId } from "lodash-es";
import {
  LegacyRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatNumber, stringToNumber } from "../../../tools/number.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./numberInput.module.css";

interface NumberInputProps {
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  format?: boolean;
  parse?: boolean;
  value: string;
  onChange?: Function;
  onChangeValue?: Function;
}

function getTextValue(value, format) {
  if (!format) return value;
  if (isString(value) && (value.endsWith(".") || value === "-")) {
    return value.toString();
  }
  const nullValue = value ? "0" : "";
  const formatOptions = isObject(format) ? format : {};
  return formatNumber(value, {
    minimumFractionDigits: 0,
    nullValue,
    ...formatOptions,
  });
}

const NumberInput = forwardRef(
  (
    {
      id,
      isBusy,
      isLoading,
      format,
      parse,
      value,
      onChange,
      onChangeValue,
      ...props
    }: NumberInputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [numberValue, setNumberValue] = useState(value || "");
    const [textValue, setTextValue] = useState<string>("");
    const [numberInputID, numberInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("numberInput_");
      return [numberId, "numberInputText_" + numberId];
    }, [id]);

    const handleChange = useCallback(
      (event) => {
        // to format the number when input value is changed by user
        let newTextValue = event.target.value;
        if (newTextValue.endsWith(".") || newTextValue === "-") {
          setTextValue(newTextValue);
          return;
        }
        const newFormattedValue = getTextValue(newTextValue, format);
        if (
          newTextValue.split(".")[1]?.length >
          newFormattedValue.split(".")[1]?.length
        ) {
          const newSplits = newTextValue.split(".");
          newTextValue = `${newSplits[0]}.${newFormattedValue.split(".")[1]}`;
        }
        const unformattedValue = format
          ? stringToNumber(newTextValue)
          : newTextValue;
        const newNumberValue =
          parse || isNil(unformattedValue)
            ? unformattedValue
            : unformattedValue.toString();
        onChange && onChange(event);
        onChangeValue && onChangeValue(newNumberValue);
        setNumberValue(unformattedValue);
        setTextValue(getTextValue(newTextValue, format));
      },
      [format, onChange, onChangeValue, parse]
    );

    useEffect(() => {
      setNumberValue(value);
    }, [value]);

    return (
      <div className={styles.root}>
        <TextInput
          id={numberInputTextID}
          isBusy={isBusy}
          isLoading={isLoading}
          onChange={handleChange}
          // cannot format in type=number
          type={format ? "text" : "number"}
          value={textValue}
          {...props}
        />
        {/* This second input is required so that if any parent component tries
         * to access the value using ref, it always gets the unformatted number,
         * not the formatted string. The behavior is meant to be consistent with
         * the handleChange function.
         */}
        <input
          ref={ref}
          type="number"
          className={styles.numberInput}
          id={numberInputID}
          readOnly
          value={numberValue}
        />
      </div>
    );
  }
);

export default NumberInput;
