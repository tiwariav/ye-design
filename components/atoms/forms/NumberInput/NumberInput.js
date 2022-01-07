import { uniqueId } from "lodash-es";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { formatNumber } from "../../../../lib/number";
import { TextInput } from "../TextInput";
import styles from "./numberInput.module.css";

const NumberInput = forwardRef(
  ({ id, isBusy, isLoading, format, value, onChange, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState(value);
    const textInputID = useMemo(() => id || uniqueId("textInput_"), [id]);

    const handleChange = useCallback(
      (event) => {
        if (format) {
          const unformattedNumber = event.target.value.split(",").join("");
          const newFormattedNumber =
            unformattedNumber === "-"
              ? "-"
              : formatNumber(unformattedNumber, {
                  decimals: 0,
                  nullValue: "",
                });
          setFormattedValue(newFormattedNumber);
          event.target.value = unformattedNumber;
        } else {
          setFormattedValue(event.target.value);
        }
        onChange(event);
      },
      [format, onChange]
    );

    const handleNumberChange = useCallback(
      (event) => {
        console.log("XY", event);
        const unformattedNumber = event.target.value.split(",").join("");
        if (
          formattedValue.split(",").join("") !==
          event.target.value.split(",").join("")
        ) {
          const newFormattedNumber = formatNumber(unformattedNumber, {
            decimals: 0,
            nullValue: "",
          });
          setFormattedValue(newFormattedNumber);
        }
      },
      [formattedValue]
    );

    return (
      <div className={styles.root}>
        <TextInput
          id={textInputID}
          isBusy={isBusy}
          isLoading={isLoading}
          onChange={handleChange}
          // cannot format in type=number
          type={format ? "text" : "number"}
          value={formattedValue}
          {...props}
          ref={ref}
        />
        <input
          ref={ref}
          type="number"
          className={styles.numberInput}
          id={id}
          onChange={handleNumberChange}
          value={value}
        />
      </div>
    );
  }
);

export default NumberInput;
