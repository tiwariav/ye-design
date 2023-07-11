import React, {
  ChangeEventHandler,
  ReactElement,
  type ReactNode,
  Suspense,
} from "react";
import {
  Controller,
  type ControllerProps,
  useFormState,
} from "react-hook-form";
import { SetOptional } from "type-fest";

import FormError from "../FormError.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then((module_) => ({
    default: module_.ErrorMessage,
  })),
);
interface HookFormInputWrapperProps
  extends SetOptional<ControllerProps, "control" | "render"> {
  children: ReactElement;
  onChange?: ChangeEventHandler;
  showError?: boolean;
}

function prependToPropMethod<TMethod extends (...args: unknown[]) => unknown>(
  method: TMethod,
  propMethod?: TMethod,
) {
  return (...args: Parameters<TMethod>) => {
    method(...args);
    propMethod?.(...args);
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            onBlur: prependToPropMethod(onBlurValue, children.props.onBlur),
            onChange: prependToPropMethod(
              onChangeValue,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              children.props.onChange,
            ),
            onChangeValue,
            ref,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
