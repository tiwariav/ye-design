import TextIconComponent from "./TextIcon";

const metadata = {
  component: TextIconComponent,
};

export default metadata;

const Template = (args) => <TextIconComponent {...args} />;

export const TextIcon = Template.bind({});
TextIcon.args = {
  children: "A",
};
