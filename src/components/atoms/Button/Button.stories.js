import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { GiBowman, GiCaveman } from "react-icons/gi";
import Button from "./Button.js";

const iconMap = { AiFillLeftCircle, AiFillRightCircle, GiBowman, GiCaveman };

const metadata = {
  argTypes: {
    iconAfter: { control: { options: Object.keys(iconMap), type: "select" } },
    iconBefore: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: Button,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = iconMap[iconAfter];
  const IconBefore = iconMap[iconBefore];
  return (
    <Button
      iconAfter={IconAfter ? <IconAfter /> : null}
      iconBefore={IconBefore ? <IconBefore /> : null}
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  effects: ["cursor-tracking", "ripple"],
  label: "Button",
};
Basic.parameters = {
  jest: ["Button.test.js"],
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
