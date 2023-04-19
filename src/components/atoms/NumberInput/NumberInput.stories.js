import { useState } from "react";
import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import NumberInput from "./NumberInput.js";

const metadata = {
  argTypes: {
    icon: { control: { options: Object.keys(storyIconMap), type: "select" } },
  },
  component: NumberInput,
};

export default metadata;

const Template = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  const [value, setValue] = useState();
  return (
    <div style={{ width }}>
      <NumberInput
        iconBefore={IconBefore ? <IconBefore /> : null}
        iconAfter={IconAfter ? <IconAfter /> : null}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        {...args}
      />
      {value !== undefined && (
        <div>
          Value: {value} ({typeof value})
        </div>
      )}
    </div>
  );
};

export const Basic = {
  args: {
    placeholder: "Enter your text",
    width: 240,
  },
  parameters: {
    jest: ["TextInput.test.js"],
  },
  render: (args) => <Template {...args} />,
};

export const Formatted = {
  args: {
    format: true,
    parse: true,
    placeholder: "Enter your text",
    width: 240,
  },
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  const [value, setValue] = useState(0);
  return (
    <div style={{ width }}>
      <Button onClick={() => setValue(value + 1)}>Update</Button>
      <NumberInput
        iconBefore={IconBefore ? <IconBefore /> : null}
        iconAfter={IconAfter ? <IconAfter /> : null}
        value={value}
        {...args}
      />
    </div>
  );
};

export const PresetValue = {
  args: {
    format: true,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};
