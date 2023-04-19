import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";

interface HookFormInputWrapperProps {
  children: any;
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
}

function appendToPropMethod(method, propMethod) {
  return (...args) => {
    method(...args);
    propMethod && propMethod(...args);
  };
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
        field: { onChange: onChangeValue, onBlur: onBlurValue, value, ref },
        fieldState: { error },
      }) =>
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            error,
            onBlur: appendToPropMethod(onBlurValue, child.props.onBlur),
            onChange: appendToPropMethod(onChangeValue, child.props.onChange),
            onChangeValue,
            ref,
            value,
          })
        )
      }
      {...props}
    />
  );
}
