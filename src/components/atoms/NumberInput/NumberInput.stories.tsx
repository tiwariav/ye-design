import type { Meta, StoryObj } from "@storybook/react";

import { useEffect, useRef, useState } from "react";

import { NanValue } from "../../../tools/number.js";
import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import NumberInput, { NumberInputProps } from "./NumberInput.js";

const metadata: Meta<typeof NumberInput> = {
  argTypes: {
    iconAfter: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
    iconBefore: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
  },
  component: NumberInput,
};

export default metadata;

type Story = StoryObj<typeof NumberInput>;

const Template = ({ width = 240, ...args }: NumberInputProps) => {
  const [eventValue, setEventValue] = useState("");
  const [refValue, setRefValue] = useState("");
  const [parsedValue, setParsedValue] = useState<NanValue>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) setRefValue(ref.current.value);
  }, [eventValue]);

  return (
    <div style={{ width }}>
      <NumberInput
        onChange={(event) => {
          setEventValue(event.target.value);
        }}
        onChangeValue={(value) => {
          setParsedValue(value);
        }}
        format={{ maximumFractionDigits: 0 }}
        placeholder="Enter your text"
        ref={ref}
        {...args}
      />
      {
        <div style={{ fontSize: "0.875rem" }}>
          <p>
            Event Value: <strong>{eventValue}</strong>{" "}
            <em>({typeof eventValue})</em>
          </p>
          <div>
            <p>
              Ref Value: <strong>{refValue}</strong>{" "}
              <em>({typeof refValue})</em>
            </p>
            <button
              onClick={() => {
                if (ref.current) setRefValue(ref.current.value);
              }}
            >
              Get latest Ref value
            </button>
          </div>
          <p>
            Parsed Value: <strong>{parsedValue}</strong>{" "}
            <em>({typeof parsedValue})</em>
          </p>
        </div>
      }
    </div>
  );
};

export const Basic: Story = {
  args: {
    width: 240,
  },
  render: (args) => <Template {...args} />,
};

export const Formatted: Story = {
  args: {
    format: true,
    parse: true,
    placeholder: "Enter your text",
  },
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = (args: NumberInputProps) => {
  const [value, setValue] = useState(2000.01);
  return (
    <div>
      <Button onClick={() => setValue(value + 0.01)}>
        Update Preset Value
      </Button>
      <Template value={value} {...args} />
    </div>
  );
};

export const PresetValue: Story = {
  args: {
    format: true,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};
