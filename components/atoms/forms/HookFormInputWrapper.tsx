import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";

interface HookFormInputWrapperProps {
  children: ReactElement;
  control: any;
  name: string;
}

export default function HookFormInputWrapper({
  children,
  control,
  name,
  ...props
}: HookFormInputWrapperProps): ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) =>
        React.cloneElement(children, {
          onChange,
          onBlur,
          value,
          ref,
          error,
        })
      }
      {...props}
    />
  );
}
