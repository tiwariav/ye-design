import React, { ChangeEvent, ReactElement, useMemo } from "react";
import { useController } from "react-hook-form";

interface HookFormInputWrapperProps {
  children: any;
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
}

export default function HookFormInputWrapper({
  children,
  name,
  ...props
}: HookFormInputWrapperProps): ReactElement {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
    formState: { defaultValues },
  } = useController({ name, ...props });
  const child = React.Children.only(children);
  const changeHandlers = useMemo(
    () => ({
      onBlur: (event: FocusEvent) => {
        onBlur();
        child.props.onBlur?.(event);
      },
      onChange: (
        event: ChangeEvent<HTMLInputElement>,
        value?: any,
        shouldUpdate = true
      ) => {
        if (shouldUpdate) {
          onChange(value);
        } else if (value === undefined) {
          onChange(event);
        }
        child.props.onChange?.(event, value, shouldUpdate);
      },
    }),
    [child.props, onBlur, onChange]
  );

  const cloneProps = useMemo(() => {
    const response = {
      error,
      ref,
      value,
      ...changeHandlers,
    } as typeof child.props;
    if (defaultValues[name] !== undefined) {
      response.defaultValue = defaultValues[name];
    }
    return response;
  }, [changeHandlers, child, defaultValues, error, name, ref, value]);

  return React.cloneElement(child, cloneProps);
}
