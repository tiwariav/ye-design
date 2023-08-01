import React, {
  ChangeEventHandler,
  ComponentPropsWithRef,
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

import FormError from "../FormError.js";

const ErrorMessage = React.lazy(() =>
  import("@hookform/error-message").then(({ ErrorMessage }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    default: ErrorMessage,
  })),
);

export type HookFormInputWrapperProps<TValues extends FieldValues> =
  SetOptional<ControllerProps<TValues>, "control" | "render"> & {
    children: ReactElement<
      ComponentPropsWithRef<"input"> & {
        format: boolean;
        onChangeValue: (value: any) => void;
        parse: boolean;
      }
    >;
    onChange?: ChangeEventHandler;
    showError?: boolean;
  };

function prependToPropMethod<TMethod extends (...args: any[]) => any>(
  method: TMethod,
  propMethod?: TMethod,
) {
  return (...args: Parameters<TMethod>) => {
    method(...args);
    propMethod?.(...args);
  };
}

export default function HookFormInputWrapper<TValues extends FieldValues>({
  children,
  name,
  showError,
  ...props
}: HookFormInputWrapperProps<TValues>): ReactNode {
  const {
    field: { onBlur, onChange, ref, value },
    formState: { errors },
  } = useController({ name, ...props });
  const child = React.Children.only(children);
  const changeHandlers = useMemo(() => {
    return {
      onChange:
        child.props.parse || child.props.format
          ? child.props.onChange
          : prependToPropMethod(onChange, child.props.onChange),
      onChangeValue:
        child.props.parse || child.props.format
          ? prependToPropMethod(onChange, child.props.onChangeValue)
          : child.props.onChangeValue,
    };
  }, [
    child.props.parse,
    child.props.format,
    child.props.onChange,
    child.props.onChangeValue,
    onChange,
  ]);

  return (
    <>
      {React.cloneElement(child, {
        onBlur: prependToPropMethod(onBlur, child.props.onBlur),
        ...changeHandlers,
        ref,
        value,
      })}
      {showError && (
        <Suspense>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages }) => <FormError messages={messages} />}
          />
        </Suspense>
      )}
    </>
  );
}
