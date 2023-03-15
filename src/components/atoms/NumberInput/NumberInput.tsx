import { isNil, isObject, uniqueId } from "lodash-es";
import {
  forwardRef,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatNumber, stringToNumber } from "../../../tools/number.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./numberInput.module.css";

const NumberInput = forwardRef(
  (
    { id, isBusy, isLoading, format, value, onChange, ...props }: any,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [formattedValue, setFormattedValue] = useState(value);
    const [numberInputID, numberInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("numberInput_");
      return [numberId, "numberInputText_" + numberId];
    }, [id]);

    const formatValue = useCallback(
      (value) => {
        let newFormattedNumber = value;
        if (!(value && (value.endsWith(".") || value === "-"))) {
          const nullValue = value ? "0" : "";
          const formatOptions = isObject(format) ? format : {};
          newFormattedNumber = formatNumber(value, {
            nullValue,
            ...formatOptions,
            minimumFractionDigits: 0,
          });
        }
        setFormattedValue(newFormattedNumber);
      },
      [format]
    );

    const handleChange = useCallback(
      (event) => {
        // to format the number when input value is changed by user
        const numberString = event.target.value;
        if (format) {
          event.target.value = stringToNumber(event.target.value);
        }
        // eslint-disable-next-line unicorn/prefer-number-properties
        if (onChange && !isNil(event.target.value)) {
          onChange(event);
        }
        if (format) {
          formatValue(numberString);
        } else {
          setFormattedValue(event.target.value);
        }
      },
      [format, formatValue, onChange]
    );

    useEffect(() => {
      // to format the number when value prop is changed
      if (format) {
        formatValue(value);
      } else {
        setFormattedValue(value);
      }
    }, [format, formatValue, value]);

    return (
      <div className={styles.root}>
        <TextInput
          id={numberInputTextID}
          isBusy={isBusy}
          isLoading={isLoading}
          onChange={handleChange}
          // cannot format in type=number
          type={format ? "text" : "number"}
          value={formattedValue}
          {...props}
        />
        <input
          ref={ref}
          type="number"
          className={styles.numberInput}
          id={numberInputID}
          readOnly
          value={value}
        />
      </div>
    );
  }
);

export default NumberInput;
