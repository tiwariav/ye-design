import { Form } from "antd";
import React, { ReactElement, useMemo } from "react";

interface AntFormItemWrapperProps {
  children: ReactElement;
  className: string;
  label: string;
  loading: boolean;
}

export default function AntFormItemWrapper({
  children,
  className,
  label,
  loading,
  ...props
}: AntFormItemWrapperProps): ReactElement {
  const overrideProps = useMemo(() => {
    return {
      ...(loading ? { isLoading: loading } : {}),
      ...(label ? { label } : {}),
    };
  }, [label, loading]);

  return (
    <Form.Item {...props}>
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
