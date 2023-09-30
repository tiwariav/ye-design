import { isObject } from "lodash-es";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  FocusEvent,
  ReactElement,
  type ReactNode,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import {
  type ControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { SetOptional } from "type-fest";

import FormError from "../FormError.js";
import { InputFormValue } from "../TextInput/TextInput.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then(({ ErrorMessage }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    default: ErrorMessage,
  })),
);

export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  value?: { action: "select-option" } | InputFormValue,
  shouldUpdate?: boolean,
) => void;

export type HookFormInputWrapperProps<TValues extends FieldValues> =
  SetOptional<ControllerProps<TValues>, "control" | "render"> & {
    children: ReactElement<
      ComponentPropsWithRef<"input"> & {
        onChange: ChangeHandler;
      }
    >;
    onChange?: ChangeEventHandler;
    showError?: boolean;
  };

export default function HookFormInputWrapper<TValues extends FieldValues>({
  children,
  name,
  showError = true,
  ...props
}: HookFormInputWrapperProps<TValues>): ReactNode {
  const {
    field: { onBlur, onChange, ref, value },
    formState: { defaultValues, errors },
  } = useController({ name, ...props });

  const child = React.Children.only(children);

  const handleHookFormChange = useCallback((
    event: ChangeEvent<HTMLInputElement>,
    value: unknown,
    shouldUpdate?: boolean,
  ) => {
    // for react-select compatibility
    if (
      isObject(value) &&
      "action" in value &&
      value?.action === "select-option"
    ) {
      onChange(event);
    }
    if (shouldUpdate) {
      onChange(value);
      return;
    }
    if (value === undefined) {
      onChange(event);
    }
  }, [onChange]);

  const changeHandlers = useMemo(
    () => ({
      onBlur: (event: FocusEvent<HTMLInputElement>) => {
        onBlur();
        child.props.onBlur?.(event);
      },
      onChange: ((event, value, shouldUpdate) => {
        handleHookFormChange(event, value, shouldUpdate);
        child.props.onChange?.(event, value, shouldUpdate);
      }) as ChangeHandler,
    }),
    [child.props, handleHookFormChange, onBlur],
  );

  const cloneProps = useMemo(() => {
    const response = {
      ref,
      value,
      ...changeHandlers,
    } as typeof child.props;
    if (defaultValues?.[name] !== undefined) {
      response.defaultValue = defaultValues[name];
    }
    return response;
  }, [changeHandlers, child, defaultValues, name, ref, value]);

  return (
    <>
      {React.cloneElement(child, cloneProps)}
      {showError && (
        <Suspense>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message, messages }) => (
              <FormError
                messages={isObject(messages) ? messages : { message }}
              />
            )}
          />
        </Suspense>
      )}
    </>
  );
}
