import FormGroupComponent from "./FormGroup.js";

const metadata = {
  component: FormGroupComponent,
};

export default metadata;

const Template = ({ ...args }) => <FormGroupComponent {...args} />;

export const FormGroup = {
  args: {
    label: "Form Group Label",
  },
  render: (args) => <Template {...args} />,
};
