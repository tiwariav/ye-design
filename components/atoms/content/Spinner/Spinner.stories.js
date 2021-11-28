import React from "react";
import { getStoryName } from "../../../../utils/storybook";
import SpinnerComponent from "./Spinner";

const metadata = {
  title: getStoryName(__dirname),
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
