import { uniqueId } from "lodash-es";
import {
  MutableRefObject,
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
  format?: boolean;
  formatFunction: Function;
  parseFunction: Function;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChangeValue?: Function;
  parse?: boolean;
  value?: string;
}

export default forwardRef(
  (
    {
      defaultValue,
      emptyValue,
      format,
      formatFunction,
      hiddenInputProps = {},
      id,
      isBusy,
      isLoading,
      onChange,
      parseFunction,
      onChangeValue,
      parse,
      value,
      ...props
    }: FromattedInputProps,
    ref: MutableRefObject<HTMLInputElement>
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
        let formattedValue = format
          ? formatFunction(event.target.value)
          : event.target.value;
        setFormattedValue(formattedValue);

        onChange && onChange(event);
        // to update the value when input value is changed by user
        const newNumberValue = parse
          ? parseFunction(formattedValue, emptyValue)
          : event.target.value;
        setParsedValue(newNumberValue);
        onChangeValue && onChangeValue(newNumberValue);
      },
      [
        emptyValue,
        format,
        formatFunction,
        onChange,
        onChangeValue,
        parse,
        parseFunction,
      ]
    );

    useEffect(() => {
      const newValue = value || defaultValue;
      const newFormattedValue = format ? formatFunction(newValue) : newValue;
      setParsedValue(
        parse ? parseFunction(newFormattedValue, emptyValue) : newValue
      );
      setFormattedValue(newFormattedValue);
    }, [
      emptyValue,
      format,
      parse,
      ref,
      value,
      defaultValue,
      formatFunction,
      parseFunction,
    ]);

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
