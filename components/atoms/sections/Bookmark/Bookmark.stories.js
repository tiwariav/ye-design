import React from "react";
import Bookmark from "./Bookmark";

const metadata = {
  title: "ye-ui/atoms/sections/Bookmark",
  component: Bookmark,
};

export default metadata;

const Template = ({ children, ...args }) => (
  <Bookmark {...args}>{children.map((child) => child)}</Bookmark>
);

export const Basic = Template.bind({});
Basic.args = {
  children: ["Home", "Some Page", "Some Inner Page"],
};
