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
    <div>
      <NumberInput
        iconBefore={IconBefore ? <IconBefore /> : null}
        iconAfter={IconAfter ? <IconAfter /> : null}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        style={{ width }}
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

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Enter your text",
  width: 240,
};
Basic.parameters = {
  jest: ["TextInput.test.js"],
};

export const Formatted = Template.bind({});
Formatted.args = {
  format: true,
  placeholder: "Enter your text",
  width: 240,
};
export const PresetValue = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  const [value, setValue] = useState(0);
  return (
    <div>
      <Button onClick={() => setValue(value + 1)}>Update</Button>
      <NumberInput
        iconBefore={IconBefore ? <IconBefore /> : null}
        iconAfter={IconAfter ? <IconAfter /> : null}
        style={{ width }}
        value={value}
        {...args}
      />
    </div>
  );
};
PresetValue.args = {
  format: true,
};
