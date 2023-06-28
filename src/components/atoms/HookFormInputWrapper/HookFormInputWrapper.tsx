import { ErrorMessage } from "@hookform/error-message";
import React, {
  JSXElementConstructor,
  ReactElement,
  type ReactNode,
} from "react";
import {
  Controller,
  type ControllerProps,
  useFormState,
} from "react-hook-form";

import CustomError from "./CustomError.js";

interface HookFormInputWrapperProps
  extends Omit<ControllerProps, "control" | "render"> {
  children: ReactElement<any, JSXElementConstructor<any> | string>;
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
  showError?: boolean;
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
  name,
  showError,
  ...props
}: HookFormInputWrapperProps): ReactNode {
  const { errors } = useFormState({ control });
  return (
    <>
      <Controller
        render={({
          field: { onBlur: onBlurValue, onChange: onChangeValue, ref, value },
        }) =>
          React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onBlur: prependToPropMethod(onBlurValue, child.props.onBlur),
              onChange: prependToPropMethod(
                onChangeValue,
                child.props.onChange
              ),
              onChangeValue,
              ref,
              value,
            })
          )?.[0]
        }
        control={control}
        name={name}
        {...props}
      />

      {showError && (
        <ErrorMessage
          render={({ messages }) =>
            messages && <CustomError messages={messages} />
          }
          errors={errors}
          name={name}
        />
      )}
    </>
  );
}
