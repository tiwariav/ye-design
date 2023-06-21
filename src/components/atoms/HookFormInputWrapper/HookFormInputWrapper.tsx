import React, { ReactElement } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  useFormContext,
} from "react-hook-form";

interface HookFormInputWrapperProps extends ControllerProps {
  children: ReactElement;
  control?: Control;
  onChange?: (...event: any[]) => void;
}

function prependToPropMethod(method, propMethod) {
  return (...args) => {
    method(...args);
    propMethod && propMethod(...args);
  };
}

export default function HookFormInputWrapper({
  children,
  control,
  ...props
}: HookFormInputWrapperProps): ReactElement {
  const formMethods = useFormContext();
  if (!formMethods && !control) {
    throw new Error(
      "HookFormInputWrapper must be used inside a HookForm or with a control prop"
    );
  }
  return (
    <Controller
      render={({
        field: { onBlur: onBlurValue, onChange: onChangeValue, ref, value },
        fieldState: { error },
      }) =>
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            error,
            onBlur: prependToPropMethod(onBlurValue, child.props.onBlur),
            onChange: prependToPropMethod(onChangeValue, child.props.onChange),
            onChangeValue,
            ref,
            value,
          })
        )
      }
      control={formMethods?.control || control}
      {...props}
    />
  );
}
