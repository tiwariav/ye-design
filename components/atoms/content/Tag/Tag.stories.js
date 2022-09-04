import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { GiBowman, GiCaveman } from "react-icons/gi";
import Tag from "./Tag";

const iconMap = {
  AiFillLeftCircle,
  AiFillRightCircle,
  GiBowman,
  GiCaveman,
  None: null,
};

const metadata = {
  argTypes: {
    iconAfter: { control: { options: Object.keys(iconMap), type: "select" } },
    iconBefore: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: Tag,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = iconMap[iconAfter];
  const IconBefore = iconMap[iconBefore];
  return (
    <Tag
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
