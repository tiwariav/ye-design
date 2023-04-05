import Image from "./Image.js";

const metadata = {
  component: Image,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ width }}>
    <Image {...args} />
  </div>
);

export const Basic = {
  args: {
    src: `${process.env.STORYBOOK_IMAGE_SRC}/160`,
    width: 160,
  },
  render: (args) => <Template {...args} />,
};

export const Circular = {
  args: {
    ...Basic.args,
    variant: "circular",
  },
  render: (args) => <Template {...args} />,
};

export const CustomRatio = {
  args: {
    ...Basic.args,
    aspectRatio: "16/9",
  },
  render: (args) => <Template {...args} />,
};

export const Loading = {
  args: {
    ...Basic.args,
    loading: true,
  },
  render: (args) => <Template {...args} />,
};

export const Busy = {
  args: {
    ...Basic.args,
    isBusy: true,
  },
  render: (args) => <Template {...args} />,
};
