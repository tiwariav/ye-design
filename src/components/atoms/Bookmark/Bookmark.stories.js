import Bookmark from "./Bookmark.js";

const metadata = {
  component: Bookmark,
};

export default metadata;

const Template = ({ children, ...args }) => (
  <Bookmark {...args}>{children.map((child) => child)}</Bookmark>
);

export const Basic = {
  args: {
    children: ["Home", "Some Page", "Some Inner Page"],
  },
  render: (args) => <Template {...args} />,
};
