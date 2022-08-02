import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { GiBowman, GiCaveman } from "react-icons/gi";
import TextGroup from "./TextGroup";

const iconMap = {
  None: null,
  AiFillLeftCircle,
  AiFillRightCircle,
  GiBowman,
  GiCaveman,
};

const metadata = {
  component: TextGroup,
  argTypes: {
    iconAfter: { control: { type: "select", options: Object.keys(iconMap) } },
    iconBefore: { control: { type: "select", options: Object.keys(iconMap) } },
  },
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = iconMap[iconAfter];
  const IconBefore = iconMap[iconBefore];
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
  iconBefore: "AiFillLeftCircle",
  iconAfter: "AiFillRightCircle",
  children: "Some Text",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};
