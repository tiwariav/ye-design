import React, { ReactElement, useMemo } from "react";
import { Controller, useController } from "react-hook-form";

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
  ...props
}: HookFormInputWrapperProps): ReactElement {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController(props);
  const child = React.Children.only(children);
  const changeHandlers = useMemo(() => {
    return {
      onChange:
        child.props.parse || child.props.format
          ? child.props.onChange
          : appendToPropMethod(onChange, child.props.onChange),
      onChangeValue:
        child.props.parse || child.props.format
          ? appendToPropMethod(onChange, child.props.onChangeValue)
          : child.props.onChangeValue,
    };
  }, [
    child.props.parse,
    child.props.format,
    child.props.onChange,
    child.props.onChangeValue,
    onChange,
  ]);

  return React.cloneElement(child, {
    error,
    onBlur: appendToPropMethod(onBlur, child.props.onBlur),
    ...changeHandlers,
    ref,
    value,
  });
}
