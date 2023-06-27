import { storyIconMap } from "../../../tools/storybook.js";
import Tag from "./Tag.js";

const metadata = {
  argTypes: {
    iconAfter: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
    iconBefore: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
  },
  component: Tag,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = storyIconMap[iconAfter];
  const IconBefore = storyIconMap[iconBefore];
  return (
    <Tag
      iconAfter={IconAfter && <IconAfter />}
      iconBefore={IconBefore && <IconBefore />}
      {...args}
    />
  );
};

export const Basic = {
  args: {
    children: "Some Text",
    iconAfter: "AiFillRightCircle",
    iconBefore: "AiFillLeftCircle",
  },
  render: (args) => <Template {...args} />,
};

export const Loading = {
  args: {
    ...Basic.args,
    loading: true,
  },
  render: (args) => <Template {...args} />,
};
