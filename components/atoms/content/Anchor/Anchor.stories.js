import path from "node:path";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { GiBowman, GiCaveman } from "react-icons/gi";
import { getStoryName } from "../../../../utils/storybook";
import Anchor from "./Anchor";

const iconMap = { AiFillLeftCircle, AiFillRightCircle, GiBowman, GiCaveman };

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: Anchor,
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
  label: "Anchor",
  effects: ["cursor-tracking", "ripple"],
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
  iconBefore: "AiFillLeftCircle",
  iconAfter: "AiFillRightCircle",
};
