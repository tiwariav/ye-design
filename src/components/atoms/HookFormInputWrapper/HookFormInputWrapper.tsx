/* eslint-disable perfectionist/sort-objects */
import type { Primitive, SetOptional } from "type-fest";

import { isObject } from "lodash-es";
import React, {
  type ChangeEvent,
  type ChangeEventHandler,
  type ComponentPropsWithRef,
  type FocusEvent,
  type ReactElement,
  type ReactNode,
  Suspense,
  useMemo,
} from "react";
import {
  type ControllerProps,
  type FieldValues,
  useController,
} from "react-hook-form";

import FormError from "../FormError.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then(({ ErrorMessage }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    default: ErrorMessage,
  }))
);

export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  value?: Primitive,
  shouldUpdate?: boolean
) => void;

export type HookFormInputWrapperProps<TValues extends FieldValues> =
  SetOptional<ControllerProps<TValues>, "control" | "render"> & {
    children: ReactElement<
      ComponentPropsWithRef<"input"> & {
        onChange: ChangeHandler;
      }
    >;
    hideError?: boolean;
    onChange?: ChangeEventHandler;
  };

export default function HookFormInputWrapper<TValues extends FieldValues>({
  children,
  hideError,
  name,
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
    [child.props, onBlur, onChange]
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
      {!hideError && (
        <Suspense>
          <ErrorMessage
            render={({ messages, message }) => (
              <FormError
                messages={isObject(messages) ? messages : { message }}
              />
            )}
            errors={errors}
            name={name}
          />
        </Suspense>
      )}
    </>
  );
}
