import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useLatest } from "react-use";

import { NumberLike } from "../../../tools/number.js";
import { TextInputProps } from "../TextInput/TextInput.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./formattedInput.module.css";

export type FormattedInputParse = (
  value: number | string | undefined,
  emptyValue: NumberLike,
) => NumberLike;

export interface FormattedInputProps extends Omit<TextInputProps, "onChange"> {
  emptyValue?: NumberLike;
  format?: (value: NumberLike) => string;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value: NumberLike,
    shouldUpdate: boolean,
  ) => void;
  parse?: FormattedInputParse;
  value?: number | string;
}

const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
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
    },
    ref,
  ) => {
    const modified = useRef(false);
    const [formattedValue, setFormattedValue] = useState<
      number | string | undefined
    >(format?.(defaultValue as NumberLike));
    const [parsedValue, setParsedValue] = useState<NumberLike>(
      parse?.(formattedValue, emptyValue),
    );
    const currentParsedValue = useLatest(parsedValue);
    const inputId = useId();

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        modified.current = true;
        // to get new formatted text when input value is changed by user
        const newFormattedValue = format
          ? format(event.target.value)
          : event.target.value;
        setFormattedValue(newFormattedValue);
        const newParsedValue = parse
          ? parse(newFormattedValue, emptyValue)
          : newFormattedValue;
        setParsedValue(newParsedValue);
        onChange?.(
          event,
          newParsedValue,
          newParsedValue !== currentParsedValue.current,
        );
      },
      [currentParsedValue, emptyValue, format, onChange, parse],
    );

    useEffect(() => {
      // return if value is not modified and is empty, to avoid
      // re-render for defaultValue
      if (!modified.current && !value) return;
      const newFormattedValue = format ? format(value) : value;
      const newParsedValue = parse
        ? parse(newFormattedValue, emptyValue)
        : value;
      if (!format || newFormattedValue !== format(newParsedValue)) {
        setFormattedValue(newFormattedValue);
      }
      setParsedValue(newParsedValue);
    }, [currentParsedValue, emptyValue, format, parse, value]);

    return (
      <div className={styles.root}>
        <TextInput
          id={`${inputId}-formattedInputText`}
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
          id={inputId}
          readOnly
          ref={ref}
          value={parsedValue ?? undefined}
          {...hiddenInputProps}
        />
      </div>
    );
  },
);

export default FormattedInput;
