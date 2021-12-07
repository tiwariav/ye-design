import path from "node:path";
import React from "react";
import { getStoryName } from "../../../../utils/storybook";
import Bookmark from "./Bookmark";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
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
