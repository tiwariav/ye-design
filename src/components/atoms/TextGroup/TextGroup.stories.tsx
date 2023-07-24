import { Meta } from "@storybook/react";

import { storyIconControl } from "../../../tools/storybook.js";
import TextGroup from "./TextGroup.js";

const metadata: Meta<typeof TextGroup> = {
  argTypes: {
    iconAfter: storyIconControl,
    iconBefore: storyIconControl,
  },
  component: TextGroup,
  render: (args) => <TextGroup className="story-bordered" {...args} />,
};

export default metadata;

export const Basic = {
  args: {
    children: "Some Text",
    iconAfter: "AiFillRightCircle",
    iconBefore: "AiFillLeftCircle",
  },
};

export const Loading = {
  args: {
    ...Basic.args,
    loading: true,
  },
};
