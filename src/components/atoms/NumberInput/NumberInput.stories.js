import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
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
