import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import TextIconComponent from "./TextIcon";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: TextIconComponent,
};

export default metadata;

const Template = (args) => <TextIconComponent {...args} />;

export const TextIcon = Template.bind({});
TextIcon.args = {
  children: "A",
};
