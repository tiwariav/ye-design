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

export const Basic = Template.bind({});
Basic.args = {
  children: "Some Text",
  iconAfter: "AiFillRightCircle",
  iconBefore: "AiFillLeftCircle",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};
