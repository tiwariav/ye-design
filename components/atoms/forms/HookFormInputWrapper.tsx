import { Form } from "antd";
import React, { ReactElement, useMemo } from "react";

interface HookFormInputWrapperProps {
  children: ReactElement;
  className: string;
}

export default function HookFormInputWrapper({
  children,
  className,
  ...props
}: HookFormInputWrapperProps): ReactElement {
  const overrideProps = useMemo(() => {
    return {};
  }, []);

  return (
    <Form.Item {...props}>
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
