import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import Image from "./Image";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: Image,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ width }}>
    <Image {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  width: 160,
  src: "https://picsum.photos/160",
};

export const Circular = Template.bind({});
Circular.args = {
  ...Basic.args,
  variant: "circular",
};

export const CustomRatio = Template.bind({});
CustomRatio.args = {
  ...Basic.args,
  aspectRatio: "16/9",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};

export const Busy = Template.bind({});
Busy.args = {
  ...Basic.args,
  isBusy: true,
};
