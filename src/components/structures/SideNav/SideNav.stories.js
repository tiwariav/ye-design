import { IconBulb, IconHome } from "@tabler/icons-react";

import Anchor from "../../atoms/Anchor/Anchor.js";
import SideNav from "./SideNav.js";
import SideNavGroup from "./SideNavGroup.js";

const metadata = {
  component: SideNav,
  subcomponents: { Anchor, SidenavGroup: SideNavGroup },
};

export default metadata;

const Template = (args) => (
  <SideNav {...args}>
    <SideNavGroup>
      <Anchor
        href="/"
        iconBefore={<IconHome />}
        label="Home"
        variant="nav-item"
      />
      <Anchor
        href="/"
        iconBefore={<IconBulb />}
        label="Menu Item"
        variant="nav-item"
      />
    </SideNavGroup>
    <SideNavGroup title="Menu Group">
      <Anchor href="/" label="Menu Item" variant="nav-item" />
      <Anchor href="/" label="Menu Item" variant="nav-item" />
    </SideNavGroup>
  </SideNav>
);

export const Basic = {
  render: (args) => <Template {...args} />,
};
