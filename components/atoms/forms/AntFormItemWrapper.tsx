import { Form } from "antd";
import clsx from "clsx";
import { isObject } from "lodash-es";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styles from "./antFormItemWrapper.module.css";

interface AntFormItemWrapperProps {
  children: ReactElement;
  className: string;
  label: string;
  loading: boolean;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  rules: any[];
}

export default function AntFormItemWrapper({
  children,
  className,
  label,
  loading,
  onBlur,
  rules,
  ...props
}: AntFormItemWrapperProps): ReactElement {
  const [firstInput, setFirstInuput] = useState(false);

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target?.value && !firstInput) {
        setFirstInuput(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    [firstInput, onBlur]
  );

  const overrideProps = useMemo(() => {
    return {
      onBlur: handleBlur,
      ...(loading ? { isLoading: loading } : {}),
      ...(label ? { label } : {}),
      required: rules?.find((item) => item.required),
    };
  }, [handleBlur, label, loading, rules]);

  const modifiedRules = useMemo(() => {
    return rules?.map((item) => {
      if (item.required && item.message && !firstInput) {
        item.message = undefined;
      }
      return item;
    });
  }, [firstInput, rules]);

  return (
    <Form.Item
      className={clsx(styles.root, className)}
      rules={modifiedRules}
      normalize={(value) => {
        console.log(value, isObject(value), Number.isNaN(value));
        if (isObject(value)) {
          return value.value;
        } else if (isNaN(value)) {
          return value;
        } else {
          return Number(value);
        }
      }}
      {...props}
    >
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
