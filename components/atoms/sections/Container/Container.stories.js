import React from "react";
import ContainerComponent from "./Container";

const metadata = {
  title: "ye-ui/atoms/sections/Container",
  component: ContainerComponent,
};

export default metadata;

const Template = ({ content, ...args }) => (
  <ContainerComponent
    style={{ border: "1px solid var(--color-black-10)" }}
    {...args}
  />
);

export const Container = Template.bind({});
Container.args = {
  children: "This is a container. It provides space around content.",
};
