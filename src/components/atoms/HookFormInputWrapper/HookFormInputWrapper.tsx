import { ErrorMessage } from "@hookform/error-message";
import React, { ReactElement } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  useFormContext,
  useFormState,
} from "react-hook-form";

import styles from "./hookFormWrapper.module.css";
interface HookFormInputWrapperProps extends ControllerProps {
  children: ReactElement;
  control?: Control;
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
}: HookFormInputWrapperProps): ReactElement {
  const formMethods = useFormContext();
  if (!formMethods && !control) {
    throw new Error(
      "HookFormInputWrapper must be used inside a HookForm or with a control prop"
    );
  }
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
          )
        }
        control={formMethods?.control || control}
        name={name}
        {...props}
      />
      {showError && (
        <ErrorMessage
          render={({ messages }) =>
            messages && (
              <div className={styles.errors}>
                {Object.entries(messages).map(([type, message]) => (
                  <p className={styles.errorItem} key={type}>
                    {message}
                  </p>
                ))}
              </div>
            )
          }
          errors={errors}
          name={name}
        />
      )}
    </>
  );
}
