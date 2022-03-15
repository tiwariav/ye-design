import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import SpinnerComponent from "./Spinner";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: SpinnerComponent,
  argTypes: {
    color: { control: "color" },
  },
};

export default metadata;

const Template = ({ width, height, color, ...args }) => (
  <div style={{ position: "relative" }}>
    <SpinnerComponent style={{ width, height, color }} {...args} />
  </div>
);

export const Spinner = Template.bind({});
Spinner.args = {
  width: 48,
  height: 48,
  color: "var(--ye-color-primary)",
};
