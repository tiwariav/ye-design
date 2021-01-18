import TextIconComponent from "./TextIcon";

const metadata = {
  title: "ye-ui/atoms/content/TextIcon",
  component: TextIconComponent,
};

export default metadata;

const Template = (args) => <TextIconComponent {...args} />;

export const TextIcon = Template.bind({});
TextIcon.args = {
  children: "A",
};
