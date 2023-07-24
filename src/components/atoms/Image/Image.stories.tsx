import { Meta, StoryObj } from "@storybook/react";

import Image from "./Image.js";

const metadata: Meta<typeof Image> = {
  component: Image,
  render: ({ width, ...args }) => (
    <div style={{ width }}>
      <Image {...args} />
    </div>
  ),
};

export default metadata;

type Story = StoryObj<typeof Image>;

export const Basic: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    src: `${process.env.STORYBOOK_IMAGE_SRC}/160`,
    width: 160,
  },
};

export const Circular: Story = {
  args: {
    ...Basic.args,
    variant: "circular",
  },
};

export const CustomRatio: Story = {
  args: {
    ...Basic.args,
    aspectRatio: "16/9",
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    isLoading: true,
  },
};

export const Busy: Story = {
  args: {
    ...Basic.args,
    isBusy: true,
  },
};
