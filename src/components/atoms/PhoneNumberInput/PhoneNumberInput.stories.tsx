import { Meta } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { NumberLike } from "../../../tools/number.js";
import { FormattedInputProps } from "../FormattedInput/FormattedInput.js";
import PhoneNumberInput from "./PhoneNumberInput.js";

const Template = ({
  iconAfter,
  iconBefore,
  width,
  ...args
}: FormattedInputProps) => {
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState<NumberLike>("");
  const ref = useRef<HTMLInputElement>(null);

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

const metadata: Meta<typeof PhoneNumberInput> = {
  component: PhoneNumberInput,
  render: (args) => <Template {...args} />,
};

export default metadata;

export const Basic = {
  args: {
    width: 240,
  },
};
