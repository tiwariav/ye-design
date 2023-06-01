import { uniqueId } from "lodash-es";
import {
  LegacyRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TextInputProps } from "../TextInput/TextInput.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./formattedInput.module.css";

export interface FromattedInputProps extends TextInputProps {
  emptyValue?: undefined | null | string | number;
  format?: Function;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChangeValue?: Function;
  parse?: Function;
  value?: string;
}

export default forwardRef(
  (
    {
      defaultValue,
      emptyValue,
      format,
      hiddenInputProps = {},
      id,
      isBusy,
      isLoading,
      onChange,
      onChangeValue,
      parse,
      value,
      ...props
    }: FromattedInputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [parsedValue, setParsedValue] = useState(value || "");
    const [formattedValue, setFormattedValue] = useState<string>("");
    const [formattedInputID, formattedInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("formattedInput_");
      return [numberId, "formattedInputText_" + numberId];
    }, [id]);

    const handleChange = useCallback(
      (event) => {
        // to get new formatted text when input value is changed by user
        console.log(event.target);
        let formattedValue = format
          ? format(event.target.value)
          : event.target.value;
        console.log(formattedValue);
        setFormattedValue(formattedValue);
        onChange && onChange(event);
        // to update the value when input value is changed by user
        const newNumberValue = parse
          ? parse(formattedValue, emptyValue)
          : event.target.value;
        console.log(newNumberValue);
        setParsedValue(newNumberValue);
        onChangeValue && onChangeValue(newNumberValue);
      },
      [emptyValue, format, onChange, onChangeValue, parse]
    );

    useEffect(() => {
      console.log(defaultValue, value, ref?.current?.value);
      // if (value && value != ref.current?.value) {
      const newValue = value || defaultValue;
      const newFormattedValue = format ? format(newValue) : newValue;
      setParsedValue(parse ? parse(newFormattedValue, emptyValue) : newValue);
      setFormattedValue(newFormattedValue);
      // }
    }, [emptyValue, format, parse, ref, value, defaultValue]);

    return (
      <div className={styles.root}>
        <TextInput
          id={formattedInputTextID}
          isBusy={isBusy}
          isLoading={isLoading}
          onChange={handleChange}
          value={formattedValue}
          {...props}
        />
        {/* This second input is required so that if any parent component tries
         * to access the value using ref, it always gets the unformatted text,
         * not the formatted string. The behavior is meant to be consistent with
         * the handleChange function.
         */}
        <input
          ref={ref}
          className={styles.numberInput}
          id={formattedInputID}
          readOnly
          value={parsedValue}
          {...hiddenInputProps}
        />
      </div>
    );
  }
);
