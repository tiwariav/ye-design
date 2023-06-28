import { storyIconMap } from "../../../tools/storybook.js";
import Anchor from "./Anchor.js";
const metadata = {
  argTypes: {
    iconAfter: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
    iconBefore: {
      control: { options: Object.keys(storyIconMap), type: "select" },
    },
  },
  component: Anchor,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, ...args }) => {
  const IconAfter = storyIconMap[iconAfter];
  const IconBefore = storyIconMap[iconBefore];
  return (
    <Anchor
      href="/"
      iconAfter={IconAfter && <IconAfter />}
      iconBefore={IconBefore && <IconBefore />}
      {...args}
    >
      Anchor
    </Anchor>
  );
};

export const Basic = {
  args: {
    effects: ["cursor-tracking", "ripple"],
    label: "Anchor",
  },
  parameters: {
    jest: ["Anchor.test.js"],
  },
  render: (args) => <Template {...args} />,
};

export const Outlined = {
  args: {
    ...Basic.args,
    variant: "outlined",
  },
  render: (args) => <Template {...args} />,
};

export const Dashed = {
  args: {
    ...Basic.args,
    variant: "dashed",
  },
  render: (args) => <Template {...args} />,
};

export const withIcon = {
  args: {
    ...Basic.args,
    iconAfter: "IconSquareRoundedChevronLeftFilled",
    iconBefore: "IconSquareRoundedChevronRightFilled",
  },
  render: (args) => <Template {...args} />,
};
