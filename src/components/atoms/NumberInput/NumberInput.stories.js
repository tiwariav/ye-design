import { useState } from "react";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
import Button from "../Button/Button.js";
import NumberInput from "./NumberInput.js";

const iconMap = {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineEye,
  AiOutlineSearch,
};

const metadata = {
  argTypes: {
    icon: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: NumberInput,
};

export default metadata;

const Template = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = iconMap[iconBefore];
  const IconAfter = iconMap[iconAfter];
  return (
    <NumberInput
      iconBefore={IconBefore ? <IconBefore /> : null}
      iconAfter={IconAfter ? <IconAfter /> : null}
      style={{ width }}
      {...args}
    />
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
  const IconBefore = iconMap[iconBefore];
  const IconAfter = iconMap[iconAfter];
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
