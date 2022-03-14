import { Form } from "antd";
import clsx from "clsx";
import { isDate, isNil } from "lodash-es";
import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [virgin, setVirgin] = useState(true);
  const valueRef = useRef<any>();

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target?.value && virgin) {
        setVirgin(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    [virgin, onBlur]
  );

  const overrideProps = useMemo(() => {
    return {
      onBlur: handleBlur,
      ...(loading ? { isLoading: loading } : {}),
      ...(label ? { label } : {}),
      required: rules?.find((item) => item.required),
    };
  }, [handleBlur, label, loading, rules]);

  return (
    <Form.Item
      validateTrigger={
        virgin && !isNil(valueRef.current) ? "onBlur" : "onChange"
      }
      className={clsx(styles.root, { [styles.virgin]: virgin }, className)}
      rules={rules}
      getValueFromEvent={(event) => {
        const value = isDate(event)
          ? event
          : event.value
          ? event.value.value
          : event.target.id?.startsWith("numberInputText")
          ? Number(event.target.value)
          : event.target.value;
        valueRef.current = value;
        return value;
      }}
      {...props}
    >
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
