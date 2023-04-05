import {
  IconFish,
  IconLogin,
  IconMicrophone,
  IconSearch,
  IconSpider,
} from "@tabler/icons-react";
import { Button, TextInput } from "../../atoms/index.js";
import TopNav from "./TopNav.js";
import TopNavItem from "./TopNavItem.js";

const iconMap = { IconFish, IconSpider };
const itemsMap = {
  Button: (
    <TopNavItem>
      <Button size="small" label="Button" variant="outlined" />
    </TopNavItem>
  ),
  ButtonWithIcon: (
    <TopNavItem>
      <Button
        size="small"
        iconBefore={<IconLogin />}
        label="Button"
        variant="outlined"
      />
    </TopNavItem>
  ),
  ButtonWithSeparator: (
    <TopNavItem hasSeparator>
      <Button
        size="small"
        iconBefore={<IconMicrophone />}
        label="Button"
        variant="outlined"
      />
    </TopNavItem>
  ),
  SearchInput: (
    <TopNavItem>
      <TextInput
        iconBefore={<IconSearch />}
        variant="borderless"
        placeholder="Search Here"
        style={{ minWidth: 240 }}
      />
    </TopNavItem>
  ),
};
const fixedStyles = {
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
};

const metadata = {
  argTypes: {
    contentLeft: {
      control: { options: Object.keys(itemsMap), type: "inline-check" },
    },
    contentRight: {
      control: { options: Object.keys(itemsMap), type: "inline-check" },
    },
    logo: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: TopNav,
};

export default metadata;

const Template = ({ logo, contentLeft, contentRight, ...args }) => {
  const Logo = iconMap[logo];
  return (
    <TopNav
      logo={Logo ? <Logo /> : null}
      contentLeft={contentLeft.map((item) => itemsMap[item])}
      contentRight={contentRight.map((item) => itemsMap[item])}
      {...args}
    />
  );
};

const FixedTemplate = (props) => (
  <div style={{ paddingTop: 120 }}>
    <div style={fixedStyles}>
      <Template {...props} />
    </div>
    <div style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "200vh" }}>
      Long content ...
    </div>
  </div>
);

export const Basic = {
  args: {
    contentLeft: ["SearchInput"],
    contentRight: ["ButtonWithSeparator", "Button"],
    logo: "IconSpider",
  },
  render: (args) => <Template {...args} />,
};

export const Transparent = {
  args: {
    ...Basic.args,
    variant: "transparent",
  },
  render: (args) => <Template {...args} />,
};

export const Fixed = {
  args: {
    ...Basic.args,
    hideOnScroll: true,
    variant: "transparent",
  },
  render: (args) => <FixedTemplate {...args} />,
};

export const MultiRow = {
  args: {
    ...Basic.args,
    hideOnScroll: "contentLeft",
    multiRow: true,
    variant: "transparent",
  },
  render: (args) => <FixedTemplate {...args} />,
};

export const Expanded = {
  args: {
    ...Basic.args,
    isExpanded: true,
    isShrinking: 0,
  },
  argTypes: {
    isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
  },
  render: (args) => <Template {...args} />,
};

export const HangingLogo = {
  args: {
    ...Basic.args,
    logoVariant: "hanging",
  },
  argTypes: {
    isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
  },
  render: (args) => <Template {...args} />,
};
