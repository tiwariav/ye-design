import path from "node:path";
import { getStoryName } from "../../../../utils/storybook";
import { Button } from "../../forms/Button";
import DropdownComponent from "./Dropdown";

const metadata = {
  title: getStoryName(path.dirname(import.meta.url)),
  component: DropdownComponent,
};

export default metadata;

const Template = ({ buttonText, ...args }) => (
  <DropdownComponent
    {...args}
    size="small"
    button={<Button label={buttonText} variant="outlined" />}
  />
);

export const Dropdown = Template.bind({});
Dropdown.args = {
  buttonText: "Dropdown",
  menuItems: ["Item 1", "Item 2"],
};
