import { storyIconMap } from "../../../tools/storybook.js";
import TextInput from "./TextInput.js";

const iconOptions = {
  options: Object.keys(storyIconMap),
  type: "select",
};
const metadata = {
  argTypes: {
    iconAfter: iconOptions,
    iconBefore: iconOptions,
  },
  component: TextInput,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  return (
    <div style={{ width }}>
      <TextInput
        iconAfter={IconAfter ? <IconAfter /> : null}
        iconBefore={IconBefore ? <IconBefore /> : null}
        {...args}
      />
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

export const Outlined = {
  args: {
    ...Basic.args,
    variant: "outlined",
  },
  render: (args) => <Template {...args} />,
};

export const Dashed = {
  args: {
    ...Basic.args,
    variant: "dashed",
  },
  render: (args) => <Template {...args} />,
};

export const Borderless = {
  args: {
    ...Basic.args,
    variant: "borderless",
  },
  render: (args) => <Template {...args} />,
};

export const withIcon = {
  args: {
    ...Basic.args,
    iconAfter: "AiOutlineEye",
    iconBefore: "AiOutlineSearch",
  },
  render: (args) => <Template {...args} />,
};
