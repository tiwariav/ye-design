import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { GiBowman, GiCaveman } from "react-icons/gi";
import Anchor from "./Anchor";

const iconMap = { AiFillLeftCircle, AiFillRightCircle, GiBowman, GiCaveman };

const metadata = {
  argTypes: {
    iconAfter: { control: { options: Object.keys(iconMap), type: "select" } },
    iconBefore: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: Anchor,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = iconMap[iconAfter];
  const IconBefore = iconMap[iconBefore];
  return (
    <Anchor
      iconAfter={IconAfter ? <IconAfter /> : null}
      iconBefore={IconBefore ? <IconBefore /> : null}
      href="/"
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  effects: ["cursor-tracking", "ripple"],
  label: "Anchor",
};
Basic.parameters = {
  jest: ["Anchor.test.js"],
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...Basic.args,
  variant: "outlined",
};

export const Dashed = Template.bind({});
Dashed.args = {
  ...Basic.args,
  variant: "dashed",
};

export const withIcon = Template.bind({});
withIcon.args = {
  ...Basic.args,
  iconAfter: "AiFillRightCircle",
  iconBefore: "AiFillLeftCircle",
};
