import { isObject } from "lodash-es";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  FocusEvent,
  ReactElement,
  type ReactNode,
  Suspense,
  useMemo,
} from "react";
import {
  type ControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { SetOptional } from "type-fest";

import { NumberLike } from "../../../tools/number.js";
import FormError from "../FormError.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then(({ ErrorMessage }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    default: ErrorMessage,
  })),
);

export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  value?: NumberLike,
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
  showError,
  ...props
}: HookFormInputWrapperProps<TValues>): ReactNode {
  const {
    field: { onBlur, onChange, ref, value },
    formState: { defaultValues, errors },
  } = useController({ name, ...props });

  const child = React.Children.only(children);
  const changeHandlers = useMemo(
    () => ({
      onBlur: (event: FocusEvent<HTMLInputElement>) => {
        onBlur();
        child.props.onBlur?.(event);
      },
      onChange: ((event, value, shouldUpdate) => {
        if (shouldUpdate) {
          onChange(value);
        } else if (value === undefined) {
          onChange(event);
        }
        child.props.onChange?.(event, value, shouldUpdate);
      }) as ChangeHandler,
    }),
    [child.props, onBlur, onChange],
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
