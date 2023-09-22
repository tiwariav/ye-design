import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { TEXT_LONG } from "./__testData.js";
import Text from "./Text.js";

const metadata: Meta<typeof Text> = {
  component: Text,
};

export default metadata;

type TemplateProps = ComponentProps<typeof Text> & { width: number };
type Story = StoryObj<TemplateProps>;

const Template = ({ width, ...args }: TemplateProps) => (
  <div style={{ border: "1px solid var(--ye-color-black-10)", width }}>
    <Text {...args} />
  </div>
);

export const Basic: Story = {
  args: {
    children: TEXT_LONG,
    isLoading: true,
    minLines: 5,
    width: 800,
  },
  render: (args) => <Template {...args} />,
};

export const FixedLines: Story = {
  args: {
    ...Basic.args,
    maxLines: 5,
    minLines: 3,
  },
  render: (args) => <Template {...args} />,
};

export const Loading: Story = {
  args: {
    ...FixedLines.args,
    isLoading: true,
  },
  render: (args) => <Template {...args} />,
};
