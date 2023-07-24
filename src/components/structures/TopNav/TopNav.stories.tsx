import { Meta, StoryObj } from "@storybook/react";
import {
  IconFish,
  IconLogin,
  IconMicrophone,
  IconSearch,
  IconSpider,
} from "@tabler/icons-react";
import { CSSProperties } from "react";

import { Button, TextInput } from "../../atoms/index.js";
import TopNav, { TopNavProps } from "./TopNav.js";
import TopNavItem from "./TopNavItem.js";

const iconMap = { IconFish, IconSpider };
const itemsMap = {
  Button: (
    <TopNavItem>
      <Button size="small" variant="outlined">
        Button
      </Button>
    </TopNavItem>
  ),
  ButtonWithIcon: (
    <TopNavItem>
      <Button iconBefore={<IconLogin />} size="small" variant="outlined">
        Button
      </Button>
    </TopNavItem>
  ),
  ButtonWithSeparator: (
    <TopNavItem hasSeparator>
      <Button iconBefore={<IconMicrophone />} size="small" variant="outlined">
        Button
      </Button>
    </TopNavItem>
  ),
  SearchInput: (
    <TopNavItem>
      <TextInput
        iconBefore={<IconSearch />}
        placeholder="Search Here"
        style={{ minWidth: 240 }}
      />
    </TopNavItem>
  ),
};
const fixedStyles: CSSProperties = {
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
};

const metadata: Meta<typeof TopNav> = {
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
  render: (args) => <TopNav {...args} />,
};

export default metadata;

type Story = StoryObj<typeof TopNav>;

const FixedTemplate = (props: TopNavProps) => (
  <div style={{ paddingTop: 120 }}>
    <div style={fixedStyles}>
      <TopNav {...props} />
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
};

export const Transparent = {
  args: {
    ...Basic.args,
    variant: "transparent",
  },
};

export const Fixed: Story = {
  args: {
    ...Basic.args,
    hideOnScroll: true,
    variant: "transparent",
  },
  render: (args) => <FixedTemplate {...args} />,
};

export const MultiRow: Story = {
  args: {
    ...Basic.args,
    hideOnScroll: "contentLeft",
    multiRow: true,
    variant: "transparent",
  },
  render: (args) => <FixedTemplate {...args} />,
};

export const Expanded = {
  argTypes: {
    isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
  },
  args: {
    ...Basic.args,
    isExpanded: true,
    isShrinking: 0,
  },
};

export const HangingLogo = {
  argTypes: {
    isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
  },
  args: {
    ...Basic.args,
    logoVariant: "hanging",
  },
};
