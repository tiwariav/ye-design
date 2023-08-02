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
        shouldUpdate?: boolean
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

  return React.cloneElement(child, {
    defaultValue: defaultValues[name],
    error,
    ref,
    value,
    ...changeHandlers,
  });
}
