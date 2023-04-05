import TextIconComponent from "./TextIcon.js";

const metadata = {
  component: TextIconComponent,
};

export default metadata;

const Template = (args) => <TextIconComponent {...args} />;

export const TextIcon = {
  args: {
    children: "A",
  },
  render: (args) => <Template {...args} />,
};
