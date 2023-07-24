import { Meta } from "@storybook/react";

import { storyIconControl } from "../../../tools/storybook.js";
import TextInput from "./TextInput.js";

const metadata: Meta<typeof TextInput> = {
  argTypes: {
    iconAfter: storyIconControl,
    iconBefore: storyIconControl,
  },
  component: TextInput,
  render: (args) => (
    <div style={{ width: 240 }}>
      <TextInput {...args} />
    </div>
  ),
};

export default metadata;

export const Basic = {
  args: {
    placeholder: "Enter your text",
    width: 240,
  },
  parameters: {
    jest: ["TextInput.test.js"],
  },
};

export const Outlined = {
  args: {
    ...Basic.args,
    variant: "outlined",
  },
};

export const Dashed = {
  args: {
    ...Basic.args,
    variant: "dashed",
  },
};

export const Borderless = {
  args: {
    ...Basic.args,
    variant: "borderless",
  },
};

export const withIcon = {
  args: {
    ...Basic.args,
    iconAfter: "AiOutlineEye",
    iconBefore: "AiOutlineSearch",
  },
};
