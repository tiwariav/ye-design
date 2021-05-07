import React from "react";
import { getStoryName } from "../../../../utils/storybook";
import FormGroupComponent from "./FormGroup";

const metadata = {
  title: getStoryName(__dirname),
  component: FormGroupComponent,
};

export default metadata;

const Template = ({ ...args }) => <FormGroupComponent {...args} />;

export const FormGroup = Template.bind({});
FormGroup.args = {
  label: "Form Group Label",
};
