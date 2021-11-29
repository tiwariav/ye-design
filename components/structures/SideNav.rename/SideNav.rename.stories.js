import React from "react";
import { AiOutlineBulb, AiOutlineHome } from "react-icons/ai";
import { getStoryName } from "../../../utils/storybook";
import Anchor from "../../atoms/content/Anchor/Anchor";
import SideNav from "./SideNav";
import SideNavGroup from "./SideNavGroup";

const metadata = {
  title: getStoryName(__dirname),
  component: SideNav,
  subcomponents: { SidenavGroup: SideNavGroup, Anchor },
};

export default metadata;

const Template = (args) => (
  <SideNav {...args}>
    <SideNavGroup>
      <Anchor
        variant="nav-item"
        iconBefore={<AiOutlineHome />}
        label="Home"
        href="/"
      />
      <Anchor
        variant="nav-item"
        iconBefore={<AiOutlineBulb />}
        label="Menu Item"
        href="/"
      />
    </SideNavGroup>
    <SideNavGroup title="Menu Group">
      <Anchor variant="nav-item" label="Menu Item" href="/" />
      <Anchor variant="nav-item" label="Menu Item" href="/" />
    </SideNavGroup>
  </SideNav>
);

export const Basic = Template.bind({});
Basic.args = {};
