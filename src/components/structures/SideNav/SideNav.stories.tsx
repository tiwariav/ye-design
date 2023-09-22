import { Meta, StoryObj } from "@storybook/react";
import { IconBulb, IconHome } from "@tabler/icons-react";

import Anchor from "../../atoms/Anchor/Anchor.js";
import SideNav from "./SideNav.js";
import SideNavGroup from "./SideNavGroup.js";

export const Template = (args: Story["args"]) => (
  <SideNav {...args}>
    <SideNavGroup>
      <Anchor href="/" iconBefore={<IconHome />} variant="nav-item">
        Home
      </Anchor>
      <Anchor href="/" iconBefore={<IconBulb />} variant="nav-item">
        Menu Item
      </Anchor>
    </SideNavGroup>
    <SideNavGroup title="Menu Group">
      <Anchor href="/" variant="nav-item">
        Menu Item
      </Anchor>
      <Anchor href="/" variant="nav-item">
        Menu Item
      </Anchor>
    </SideNavGroup>
  </SideNav>
);

const metadata: Meta<typeof SideNav> = {
  component: SideNav,
  render: (args) => <Template {...args} />,
};

export default metadata;

type Story = StoryObj<typeof SideNav>;

export const Basic: Story = {};
