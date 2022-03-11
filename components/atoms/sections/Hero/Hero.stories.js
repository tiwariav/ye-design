import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import Hero from "./Hero";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: Hero,
};

export default metadata;

const Template = (args) => <Hero {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: "Hero Title",
  midContent: <p>Hero content</p>,
};
