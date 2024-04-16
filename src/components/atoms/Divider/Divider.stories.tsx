import type { Meta, StoryObj } from "@storybook/react";

import Divider from "./Divider.js";

const metadata: Meta<typeof Divider> = {
  argTypes: {
    color: { control: "color" },
  },
  component: Divider,
};

export default metadata;

type Story = StoryObj<typeof Divider>;

export const Basic: Story = {
  render: (args) => <Divider {...args} />,
};
