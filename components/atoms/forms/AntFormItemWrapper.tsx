import { Form } from "antd";
import clsx from "clsx";
import { isDate } from "lodash-es";
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
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  rules: any[];
}

export default function AntFormItemWrapper({
  children,
  className,
  label,
  loading,
  onBlur,
  onKeyPress,
  rules,
  ...props
}: AntFormItemWrapperProps): ReactElement {
  const [virgin, setVirgin] = useState(true);
  const [validateTrigger, setValidateTrigger] = useState("onChange");
  const valueRef = useRef<any>();

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target?.value && virgin) {
        setVirgin(false);
        setValidateTrigger("onChange");
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    [virgin, onBlur]
  );

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key && virgin) {
          setValidateTrigger("onBlur");
        }
        if (onKeyPress) {
          onKeyPress(event);
        }
      },
      [virgin, onKeyPress]
    );

  const overrideProps = useMemo(() => {
    return {
      onBlur: handleBlur,
      onKeyPress: handleKeyPress,
      ...(loading ? { isLoading: loading } : {}),
      ...(label ? { label } : {}),
      required: rules?.find((item) => item.required),
    };
  }, [handleBlur, handleKeyPress, label, loading, rules]);

  return (
    <Form.Item
      validateTrigger={validateTrigger}
      className={clsx(styles.root, { [styles.virgin]: virgin }, className)}
      rules={rules}
      getValueFromEvent={(event) => {
        return isDate(event)
          ? event
          : event.value ??
              (event.target.id?.startsWith("numberInputText")
                ? Number(event.target.value)
                : event.target.value);
      }}
      {...props}
    >
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
