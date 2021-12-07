import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import Text from "./Text";
import { TEXT_LONG } from "./__testData";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: Text,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ width, border: "1px solid var(--ye-color-black-10)" }}>
    <Text {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  width: 800,
  children: TEXT_LONG,
};

export const FixedLines = Template.bind({});
FixedLines.args = {
  ...Basic.args,
  minLines: 3,
  maxLines: 5,
};

export const Loading = Template.bind({});
Loading.args = {
  ...FixedLines.args,
  loading: true,
};
