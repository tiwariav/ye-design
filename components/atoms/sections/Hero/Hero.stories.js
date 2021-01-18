import React from "react";
import Hero from "./Hero";

const metadata = {
  title: "ye-ui/atoms/sections/Hero",
  component: Hero,
};

export default metadata;

const Template = (args) => <Hero {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: "Hero Title",
  midContent: <p>Hero content</p>,
};
