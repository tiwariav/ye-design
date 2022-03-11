import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import FormGroupComponent from "./FormGroup";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: FormGroupComponent,
};

export default metadata;

const Template = ({ ...args }) => <FormGroupComponent {...args} />;

export const FormGroup = Template.bind({});
FormGroup.args = {
  label: "Form Group Label",
};
