import Text from "./Text";
import { TEXT_LONG } from "./__testData";

const metadata = {
  component: Text,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ border: "1px solid var(--ye-color-black-10)", width }}>
    <Text {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  children: TEXT_LONG,
  width: 800,
};

export const FixedLines = Template.bind({});
FixedLines.args = {
  ...Basic.args,
  maxLines: 5,
  minLines: 3,
};

export const Loading = Template.bind({});
Loading.args = {
  ...FixedLines.args,
  loading: true,
};
