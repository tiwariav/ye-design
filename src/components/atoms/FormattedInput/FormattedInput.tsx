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
  emptyValue?: null | number | string | undefined;
  format?: (string) => any;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChangeValue?: (any) => any;
  parse?: (string, any) => any;
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
    ref: MutableRefObject<HTMLInputElement>
  ) => {
    const [parsedValue, setParsedValue] = useState<string | undefined>(
      format?.(defaultValue)
    );
    const [formattedValue, setFormattedValue] = useState<string | undefined>(
      parse?.(parsedValue, emptyValue) || ""
    );
    const [formattedInputID, formattedInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("formattedInput_");
      return [numberId, "formattedInputText_" + numberId];
    }, [id]);

    const handleChange = useCallback(
      (event) => {
        // to get new formatted text when input value is changed by user
        const formattedValue = format
          ? format(event.target.value)
          : event.target.value;
        setFormattedValue(formattedValue);
        const newParsedValue = parse
          ? parse(formattedValue, emptyValue)
          : formattedValue;
        setParsedValue(newParsedValue);
        onChange?.(event);
      },
      [emptyValue, format, onChange, parse]
    );

    useEffect(() => {
      onChangeValue?.(parsedValue);
    }, [onChangeValue, parsedValue]);

    useEffect(() => {
      const newFormattedValue = format ? format(value) : value;
      setParsedValue(parse ? parse(newFormattedValue, emptyValue) : value);
      setFormattedValue(newFormattedValue);
    }, [emptyValue, format, parse, value]);

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
          className={styles.numberInput}
          id={formattedInputID}
          readOnly
          ref={ref}
          value={parsedValue}
          {...hiddenInputProps}
        />
      </div>
    );
  }
);
