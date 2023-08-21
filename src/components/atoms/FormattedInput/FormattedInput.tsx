import { uniqueId } from "lodash-es";
import {
  ChangeEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLatest } from "react-use";

import { TextInputProps } from "../TextInput/TextInput.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./formattedInput.module.css";

export interface FromattedInputProps extends Omit<TextInputProps, "onChange"> {
  emptyValue?: null | number | string | undefined;
  format?: (string) => any;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value: any,
    shouldUpdate: boolean
  ) => void;
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
      parse,
      value,
      ...props
    }: FromattedInputProps,
    ref: MutableRefObject<HTMLInputElement>
  ) => {
    const modified = useRef(false);
    const [formattedValue, setFormattedValue] = useState<string | undefined>(
      () => format?.(defaultValue)
    );
    const [parsedValue, setParsedValue] = useState<string | undefined>(() =>
      parse?.(formattedValue, emptyValue)
    );
    const currentParsedValue = useLatest(parsedValue);
    const [formattedInputID, formattedInputTextID] = useMemo(() => {
      const numberId = id || uniqueId("formattedInput_");
      return [numberId, "formattedInputText_" + numberId];
    }, [id]);

    const handleChange = useCallback(
      (event) => {
        modified.current = true;
        // to get new formatted text when input value is changed by user
        const formattedValue = format
          ? format(event.target.value)
          : event.target.value;
        setFormattedValue(formattedValue);
        const newParsedValue = parse
          ? parse(formattedValue, emptyValue)
          : formattedValue;
        setParsedValue(newParsedValue);
        onChange?.(
          event,
          newParsedValue,
          newParsedValue !== currentParsedValue.current
        );
      },
      [currentParsedValue, emptyValue, format, onChange, parse]
    );

    useEffect(() => {
      // return if value is not modified and is empty, to avoid
      // re-render for defaultValue
      if (!modified.current && !value) return;
      const newFormattedValue = format ? format(value) : value;
      const newParsedValue = parse
        ? parse(newFormattedValue, emptyValue)
        : value;
      if (!format || newParsedValue !== currentParsedValue.current) {
        setFormattedValue(newFormattedValue);
      }
      setParsedValue(newParsedValue);
    }, [currentParsedValue, emptyValue, format, parse, value]);

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
