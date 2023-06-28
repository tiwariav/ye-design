import { useEffect, useRef, useState } from "react";

import PhoneNumberInput from "./PhoneNumberInput.js";

const metadata = {
  component: PhoneNumberInput,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState();
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    setRefValue(ref.current?.value);
  }, [eventValue]);
  return (
    <div style={{ width }}>
      <PhoneNumberInput
        onChange={(event) => {
          setEventValue(event.target.value);
        }}
        onChangeValue={(value) => {
          setParsedValue(value);
        }}
        ref={ref}
        {...args}
      />
      {eventValue !== undefined && (
        <div style={{ fontSize: "0.875rem" }}>
          <p>
            Event Value: <strong>{eventValue}</strong>{" "}
            <em>({typeof eventValue})</em>
          </p>
          <p>
            Ref Value: <strong>{refValue}</strong> <em>({typeof refValue})</em>
          </p>
          <p>
            Parsed Value: <strong>{parsedValue}</strong>{" "}
            <em>({typeof parsedValue})</em>
          </p>
        </div>
      )}
    </div>
  );
};

export const Basic = {
  args: {
    width: 240,
  },
  render: (args) => <Template {...args} />,
};
