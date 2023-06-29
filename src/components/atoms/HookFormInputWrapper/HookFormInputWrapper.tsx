import React, {
  ChangeEventHandler,
  ReactElement,
  type ReactNode,
  Suspense,
} from "react";
import {
  Control,
  Controller,
  type ControllerProps,
  useFormState,
} from "react-hook-form";

import FormError from "../FormError.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then((module_) => ({
    default: module_.ErrorMessage,
  }))
);
interface HookFormInputWrapperProps
  extends Omit<ControllerProps, "control" | "render"> {
  children: ReactElement;
  control?: Control;
  onChange?: ChangeEventHandler;
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
  showError = true,
  ...props
}: HookFormInputWrapperProps): ReactNode {
  const { errors } = useFormState({ control });
  return (
    <>
      <Controller
        render={({
          field: { onBlur: onBlurValue, onChange: onChangeValue, ref, value },
        }) =>
          React.cloneElement(children, {
            onBlur: prependToPropMethod(onBlurValue, children.props.onBlur),
            onChange: prependToPropMethod(
              onChangeValue,
              children.props.onChange
            ),
            onChangeValue,
            ref,
            value,
          })
        }
        control={control}
        name={name}
        {...props}
      />
      {showError && (
        <Suspense>
          <ErrorMessage
            render={({ messages }) =>
              messages && <FormError messages={messages} />
            }
            errors={errors}
            name={name}
          />
        </Suspense>
      )}
    </>
  );
}
