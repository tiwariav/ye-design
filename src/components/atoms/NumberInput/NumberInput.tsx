import { isNil, uniqueId } from "lodash-es";
import {
  forwardRef,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatNumber, isValidNumber } from "../../../tools/number.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./numberInput.module.css";

const NumberInput = forwardRef(
  (
    { id, isBusy, isLoading, format, value, mode, onChange, ...props }: any,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [formattedValue, setFormattedValue] = useState(value);
    const [numberInputID, numberInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("numberInput_");
      return [numberId, "numberInputText_" + numberId];
    }, [id]);

    const formatValue = useCallback((value: string = "") => {
      const inputValue = value;
      if (isValidNumber(inputValue)) {
        if (inputValue.charAt(inputValue.length - 1) === ".") {
          setFormattedValue(inputValue);
        } else {
          const numberValue = Number(inputValue.replace(/,/g, ""));
          const formattedValue = formatNumber(numberValue, mode);
          setFormattedValue(formattedValue);
        }
      }
    }, []);

    const handleChange = useCallback(
      (event) => {
        if (format) {
          event.target.value = String(event.target.value).split(",").join("");
        }
        // eslint-disable-next-line unicorn/prefer-number-properties
        if (onChange && !isNil(event.target.value)) {
          onChange(event);
        }
        if (format) {
          formatValue(event.target.value);
        } else {
          setFormattedValue(event.target.value);
        }
      },
      [format, formatValue, onChange]
    );

    useEffect(() => {
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
