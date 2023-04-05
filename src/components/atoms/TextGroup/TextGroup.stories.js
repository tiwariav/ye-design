import { storyIconMap } from "../../../tools/storybook.js";
import TextGroup from "./TextGroup.js";

const metadata = {
  argTypes: {
    iconAfter: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
    iconBefore: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
  },
  component: TextGroup,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = storyIconMap[iconAfter];
  const IconBefore = storyIconMap[iconBefore];
  return (
    <TextGroup
      iconAfter={IconAfter ? <IconAfter /> : null}
      iconBefore={IconBefore ? <IconBefore /> : null}
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
