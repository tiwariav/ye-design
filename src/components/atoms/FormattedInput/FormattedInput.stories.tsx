import { StoryObj } from "@storybook/react";
import { isString } from "lodash-es";
import { useEffect, useRef, useState } from "react";

import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import { InputFormValue } from "../TextInput/TextInput.js";
import FormattedInput, { FormattedInputProps } from "./FormattedInput.js";

const metadata = {
  argTypes: {
    iconAfter: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
    iconBefore: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
  },
  component: FormattedInput,
};

export default metadata;

type Story = StoryObj<typeof FormattedInput>;

function addHyphens(value: InputFormValue) {
  return isString(value)
    ? [...value].filter((item) => item !== "-").join("-")
    : String(value);
}

function removeHyphens(
  value: number | string | undefined,
  emptyValue: InputFormValue,
) {
  return isString(value) ? value.replaceAll("-", "") : emptyValue;
}

const Template = (args: FormattedInputProps) => {
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState<InputFormValue>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) setRefValue(ref.current.value);
  }, [eventValue]);

  return (
    <div>
      <FormattedInput
        onChange={(event, value) => {
          setEventValue(event.target.value);
          setParsedValue(value);
        }}
        placeholder="Enter your text"
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

export const Basic: Story = {
  args: {
    format: addHyphens,
    parse: removeHyphens,
  },
  render: (args) => <Template {...args} />,
};

export const FormatOnly: Story = {
  args: {
    format: addHyphens,
  },
  render: (args) => <Template {...args} />,
};
export const ParseOnly: Story = {
  args: {
    parse: addHyphens,
  },
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = (args: FormattedInputProps) => {
  const [value, setValue] = useState("Apples");
  return (
    <div>
      <Button onClick={() => setValue(value + "a")}>Update</Button>
      <Template {...args} value={value} />
    </div>
  );
};

export const PresetValue: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};
