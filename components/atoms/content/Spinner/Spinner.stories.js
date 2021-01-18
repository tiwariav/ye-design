import React from "react";
import SpinnerComponent from "./Spinner";

const metadata = {
  title: "ye-ui/atoms/content/Spinner",
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
  color: "var(--color-primary)",
};
