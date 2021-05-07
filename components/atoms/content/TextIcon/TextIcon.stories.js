import { getStoryName } from "../../../../utils/storybook";
import TextIconComponent from "./TextIcon";

const metadata = {
  title: getStoryName(__dirname),
  component: TextIconComponent,
};

export default metadata;

const Template = (args) => <TextIconComponent {...args} />;

export const TextIcon = Template.bind({});
TextIcon.args = {
  children: "A",
};
