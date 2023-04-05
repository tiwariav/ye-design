import Text from "./Text.js";
import { TEXT_LONG } from "./__testData.js";

const metadata = {
  component: Text,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ border: "1px solid var(--ye-color-black-10)", width }}>
    <Text {...args} />
  </div>
);

export const Basic = {
  args: {
    children: TEXT_LONG,
    width: 800,
  },
  render: (args) => <Template {...args} />,
};

export const FixedLines = {
  args: {
    ...Basic.args,
    maxLines: 5,
    minLines: 3,
  },
  render: (args) => <Template {...args} />,
};

export const Loading = {
  args: {
    ...FixedLines.args,
    loading: true,
  },
  render: (args) => <Template {...args} />,
};
