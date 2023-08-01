import { useEffect, useRef, useState } from "react";

import PhoneNumberInput from "./PhoneNumberInput.js";

const metadata = {
  component: PhoneNumberInput,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  const [eventValue, setEventValue] = useState();
  const [refValue, setRefValue] = useState();
  const [parsedValue, setParsedValue] = useState();
  const ref = useRef();

  useEffect(() => {
    setRefValue(ref.current?.value);
  }, [eventValue]);
  return (
    <div style={{ width }}>
      <PhoneNumberInput
        onChange={(event, value) => {
          setEventValue(event.target.value);
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
    // placeholder: "Enter your password",
    width: 240,
  },
  render: (args) => <Template {...args} />,
};
