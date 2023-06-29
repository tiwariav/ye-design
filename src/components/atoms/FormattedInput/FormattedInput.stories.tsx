import { useEffect, useRef, useState } from "react";

import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import NumberInput from "../NumberInput/NumberInput.js";
import FormattedInput from "./FormattedInput.js";

const metadata = {
  argTypes: {
    icon: { control: { options: Object.keys(storyIconMap), type: "select" } },
  },
  component: FormattedInput,
};

export default metadata;

function addHyphens(value) {
  return value ? [...value].filter((item) => item !== "-").join("-") : value;
}

function removeHyphens(value, emptyValue) {
  return value ? value.replaceAll("-", "") : emptyValue;
}

const Template = ({
  iconAfter = "None",
  iconBefore = "None",
  width = 240,
  ...args
}) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState();
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    setRefValue(ref.current.value);
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
        iconAfter={IconAfter && <IconAfter />}
        iconBefore={IconBefore && <IconBefore />}
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

export const Basic = {
  args: {
    format: addHyphens,
    parse: removeHyphens,
  },
  render: (args) => <Template {...args} />,
};

export const FormatOnly = {
  args: {
    format: addHyphens,
  },
  render: (args) => <Template {...args} />,
};
export const ParseOnly = {
  args: {
    parse: addHyphens,
  },
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = ({ width, ...args }) => {
  const [value, setValue] = useState("Apples");
  return (
    <div style={{ width }}>
      <Button onClick={() => setValue(value + "a")}>Update</Button>
      <Template {...args} value={value} />
    </div>
  );
};

export const PresetValue = {
  args: {
    ...Basic.args,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};
